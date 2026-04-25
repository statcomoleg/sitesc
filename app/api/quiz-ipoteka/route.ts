import { NextResponse } from "next/server";
import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

interface QuizAnswersPayload {
  location?: string;
  propertyType?: string;
  objectStatus?: string;
  objectPrice?: string;
  hasDownPayment?: string;
  purchaseTimeline?: string;
}

interface LeadPayload {
  name?: string;
  city?: string;
  phone?: string;
  messenger?: string;
  consent?: boolean;
}

interface SubmitPayload {
  answers?: QuizAnswersPayload;
  lead?: LeadPayload;
  computed?: {
    downPayment?: number;
  };
  pageUrl?: string;
  source?: string;
}

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function getOptionalEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function toNumber(value?: string): number {
  if (!value) return 0;
  const normalized = value.replace(/[^\d]/g, "");
  return Number(normalized || 0);
}

function formatMoney(value: number): string {
  if (!value) return "Не указано";
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);
}

async function sendToTelegram(message: string) {
  const botToken = getEnv("TELEGRAM_BOT_TOKEN");
  const chatId = getEnv("TELEGRAM_CHAT_ID");

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Telegram API error: ${response.status} ${responseText}`);
  }
}

interface RelayPayload {
  message: string;
  lead: { name: string; city: string; phone: string; messenger: string };
  answers: QuizAnswersPayload;
  computed: { objectPrice: number; downPayment: number };
  pageUrl: string;
}

async function persistLeadToFile(payload: RelayPayload) {
  const storageDir = process.env.QUIZ_LEADS_DIR?.trim() || path.join(process.cwd(), "storage");
  const filePath = path.join(storageDir, "quiz-ipoteka-leads.jsonl");

  await mkdir(storageDir, { recursive: true });

  const record = {
    savedAt: new Date().toISOString(),
    ...payload,
  };

  await appendFile(filePath, `${JSON.stringify(record)}\n`, "utf-8");
  return filePath;
}

async function sendToRelayWebhook(payload: RelayPayload) {
  const relayUrl = process.env.TELEGRAM_RELAY_WEBHOOK_URL?.trim();
  if (!relayUrl) {
    return false;
  }

  const chatId = getOptionalEnv("TELEGRAM_CHAT_ID") || "";

  const response = await fetch(relayUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      chatId,
      parseMode: "HTML",
    }),
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Relay webhook error: ${response.status} ${responseText}`);
  }

  return true;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SubmitPayload;
    const answers = body.answers || {};
    const lead = body.lead || {};
    const computed = body.computed || {};
    const pageUrl = body.pageUrl?.trim() || "Не передан";
    const source = body.source?.trim() || "";

    const name = lead.name?.trim() || "";
    const city = lead.city?.trim() || "";
    const phone = lead.phone?.trim() || "";
    const messenger = lead.messenger?.trim() || "";

    if (!name || !city || !phone || !messenger || !lead.consent) {
      return NextResponse.json(
        { ok: false, message: "Заполните обязательные поля и подтвердите согласие." },
        { status: 400 }
      );
    }

    const objectPrice = toNumber(answers.objectPrice);
    const downPayment = Number(computed.downPayment || Math.round(objectPrice * 0.2));

    const message = [
      source ? `<b>Новая заявка: ${escapeHtml(source)}</b>` : "<b>Новая заявка: квиз ипотека</b>",
      "",
      `<b>Имя:</b> ${escapeHtml(name)}`,
      `<b>Телефон:</b> ${escapeHtml(phone)}`,
      `<b>Мессенджер:</b> ${escapeHtml(messenger)}`,
      `<b>Город из формы:</b> ${escapeHtml(city)}`,
      "",
      "<b>Ответы квиза:</b>",
      `1) Локация: ${escapeHtml(answers.location || "Не указано")}`,
      `2) Что приобрести: ${escapeHtml(answers.propertyType || "Не указано")}`,
      `3) Объект найден: ${escapeHtml(answers.objectStatus || "Не указано")}`,
      `4) Стоимость объекта: ${escapeHtml(formatMoney(objectPrice))}`,
      `5) Первоначальный взнос 20%: ${escapeHtml(answers.hasDownPayment || "Не указано")}`,
      `   Сумма 20%: ${escapeHtml(formatMoney(downPayment))}`,
      `6) Срок покупки: ${escapeHtml(answers.purchaseTimeline || "Не указано")}`,
      "",
      `<b>URL:</b> ${escapeHtml(pageUrl)}`,
      `<b>Дата:</b> ${escapeHtml(new Date().toLocaleString("ru-RU"))}`,
    ].join("\n");

    const relayPayload: RelayPayload = {
      message,
      lead: { name, city, phone, messenger },
      answers,
      computed: { objectPrice, downPayment },
      pageUrl,
    };

    try {
      const sentViaRelay = await sendToRelayWebhook(relayPayload);
      if (sentViaRelay) {
        return NextResponse.json({ ok: true });
      }
      await sendToTelegram(message);
      return NextResponse.json({ ok: true });
    } catch (telegramError) {
      console.error("Quiz ipoteka telegram delivery error:", telegramError);
    }

    const fallbackFilePath = await persistLeadToFile(relayPayload);
    console.warn("Quiz ipoteka lead saved to local file fallback:", fallbackFilePath);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Quiz ipoteka submit error:", error);
    return NextResponse.json(
      { ok: false, message: "Не удалось отправить заявку. Попробуйте позже." },
      { status: 500 }
    );
  }
}

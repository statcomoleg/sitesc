import { NextResponse } from "next/server";
import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { services } from "@/app/data/services";

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  phone?: string;
  serviceSlug?: string;
  pageUrl?: string;
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

function resolveServiceName(serviceSlug?: string): string {
  if (!serviceSlug) return "Не выбрана";
  if (serviceSlug === "other") return "Другое";
  return services.find((service) => service.slug === serviceSlug)?.title ?? serviceSlug;
}

async function sendViaRelay(message: string) {
  const relayUrl = process.env.TELEGRAM_RELAY_WEBHOOK_URL?.trim();
  if (!relayUrl) return false;

  const chatId = getOptionalEnv("TELEGRAM_CHAT_ID") || "";

  const response = await fetch(relayUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, chatId, parseMode: "HTML" }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Relay webhook error: ${response.status} ${text}`);
  }

  return true;
}

async function sendDirectTelegram(message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!botToken || !chatId) throw new Error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");

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
    const text = await response.text();
    throw new Error(`Telegram API error: ${response.status} ${text}`);
  }
}

async function persistToFile(data: Record<string, unknown>) {
  const storageDir = process.env.QUIZ_LEADS_DIR?.trim() || path.join(process.cwd(), "storage");
  const filePath = path.join(storageDir, "contact-leads.jsonl");
  await mkdir(storageDir, { recursive: true });
  const record = { savedAt: new Date().toISOString(), ...data };
  await appendFile(filePath, `${JSON.stringify(record)}\n`, "utf-8");
  return filePath;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;
    const name = body.name?.trim();
    const phone = body.phone?.trim();
    const serviceSlug = body.serviceSlug?.trim();
    const pageUrl = body.pageUrl?.trim() || "Не передан";

    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, message: "Имя и телефон обязательны" },
        { status: 400 }
      );
    }

    const serviceName = resolveServiceName(serviceSlug);

    const message = [
      "<b>Заявка с основного сайта</b>",
      "",
      `<b>Имя:</b> ${escapeHtml(name)}`,
      `<b>Телефон:</b> ${escapeHtml(phone)}`,
      `<b>Услуга:</b> ${escapeHtml(serviceName)}`,
      "",
      `<b>URL:</b> ${escapeHtml(pageUrl)}`,
      `<b>Дата:</b> ${escapeHtml(new Date().toLocaleString("ru-RU"))}`,
    ].join("\n");

    try {
      const sentViaRelay = await sendViaRelay(message);
      if (sentViaRelay) return NextResponse.json({ ok: true });
      await sendDirectTelegram(message);
      return NextResponse.json({ ok: true });
    } catch (telegramError) {
      console.error("Contact form telegram delivery error:", telegramError);
    }

    const fallbackPath = await persistToFile({ name, phone, serviceName, serviceSlug, pageUrl });
    console.warn("Contact lead saved to file fallback:", fallbackPath);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { ok: false, message: "Не удалось отправить заявку. Попробуйте позже." },
      { status: 500 }
    );
  }
}

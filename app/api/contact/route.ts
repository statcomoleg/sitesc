import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { services } from "@/app/data/services";

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  phone?: string;
  serviceSlug?: string;
  pageUrl?: string;
}

const RECEIVER_EMAIL = "statcomoleg@gmail.com";

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function resolveServiceName(serviceSlug?: string): string {
  if (!serviceSlug) return "Не выбрана";
  if (serviceSlug === "other") return "Другое";
  return services.find((service) => service.slug === serviceSlug)?.title ?? serviceSlug;
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

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true,
      auth: {
        user: getEnv("SMTP_USER"),
        pass: getEnv("SMTP_PASS"),
      },
    });

    const serviceName = resolveServiceName(serviceSlug);
    const subject = `Новая заявка с сайта Стат-Кредит (${name})`;

    const text = [
      "Новая заявка с формы обратной связи",
      "",
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Услуга: ${serviceName}`,
      `Slug услуги: ${serviceSlug || "Не выбран"}`,
      `Страница: ${pageUrl}`,
      `Дата: ${new Date().toLocaleString("ru-RU")}`,
    ].join("\n");

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
        <h2 style="margin:0 0 16px">Новая заявка с формы обратной связи</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Услуга:</strong> ${serviceName}</p>
        <p><strong>Slug услуги:</strong> ${serviceSlug || "Не выбран"}</p>
        <p><strong>Страница:</strong> ${pageUrl}</p>
        <p><strong>Дата:</strong> ${new Date().toLocaleString("ru-RU")}</p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || getEnv("SMTP_USER"),
      to: RECEIVER_EMAIL,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form send error:", error);
    return NextResponse.json(
      { ok: false, message: "Не удалось отправить заявку. Попробуйте позже." },
      { status: 500 }
    );
  }
}

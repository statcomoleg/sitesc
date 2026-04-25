"use client";

import { useState } from "react";
import Image from "next/image";

interface EstateLizFormState {
  name: string;
  phone: string;
  consent: boolean;
}

const initialForm: EstateLizFormState = {
  name: "",
  phone: "",
  consent: false,
};

export function EstateLizLanding() {
  const [form, setForm] = useState<EstateLizFormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const canSubmit =
    form.name.trim().length >= 2 &&
    form.phone.trim().length >= 8 &&
    form.consent &&
    !submitting;

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/quiz-ipoteka", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: {
            location: "Москва",
            objectPrice: "Не указано",
            hasDownPayment: "Да",
            purchaseTimeline: "Срочно",
          },
          lead: {
            name: form.name.trim(),
            city: "Москва",
            phone: form.phone.trim(),
            messenger: "Telegram",
            consent: form.consent,
          },
          computed: {
            downPayment: 0,
          },
          pageUrl: window.location.href,
        }),
      });

      const result = (await response.json()) as { ok: boolean; message?: string };
      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Не удалось отправить заявку.");
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Не удалось отправить заявку.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-dark text-text">
      <Image
        src="/fonip.jpg"
        alt="Фон лендинга по ипотеке без банков"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-zinc-900/75 to-black/85" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-8 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-6">
            <p className="font-[family-name:var(--font-heading)] text-xl font-bold gradient-text sm:text-2xl">
              СТАТКРЕДИТ
            </p>
            <p className="max-w-3xl text-xs leading-relaxed text-text-muted sm:ml-auto sm:text-right sm:text-sm">
              Мы выдаем ипотеку без банков на 20 лет и с первоначальным взносом 20%. Ваша кредитная история и
              доход не имеют значения, вы получите одобрение.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
          <div className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur-md sm:p-8">
            <h1 className="font-[family-name:var(--font-heading)] text-[clamp(1.35rem,2.8vw,2.3rem)] font-bold leading-tight">
              Банки отказывают в ипотеке? Мы не откажем и поможем купить любую недвижимость за 20% от стоимости в
              Москве, Санкт-Петербурге и областях!
            </h1>

            <ul className="mt-7 space-y-3 text-sm text-text-muted sm:text-base">
              {[
                "Ставка 24%-27% годовых (как в банке)",
                "Первоначальный взнос от 20%",
                "На срок до 20 лет",
                "С любой кредитной историей и доходом",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-r from-primary to-sand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="gradient-border p-5 sm:p-7">
            {submitted ? (
              <div className="text-center">
                <p className="text-sm font-semibold uppercase text-primary">Заявка отправлена</p>
                <h2 className="mt-3 font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
                  Спасибо! Мы скоро свяжемся с вами
                </h2>
                <p className="mt-3 text-sm text-text-muted">
                  Менеджер подготовит расчеты и напишет вам по указанному номеру.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-text sm:text-xl leading-snug">
                  Хотите мы подсчитаем ваш ежемесячный платеж?
                </h2>
                <p className="text-sm leading-relaxed text-text-muted sm:text-base">
                  Заполните форму и мы дадим вам все расчеты, чтобы вы посчитали, выгоден ли этот вариант вам.
                </p>

                <label className="block">
                  <span className="mb-1.5 block text-sm text-text-muted">Имя</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/60"
                    placeholder="Введите имя"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm text-text-muted">Номер телефона</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/60"
                    placeholder="+7 (999) 123-45-67"
                    required
                  />
                </label>

                <label className="flex items-start gap-2.5 text-xs text-text-muted">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(event) => setForm((prev) => ({ ...prev, consent: event.target.checked }))}
                    className="mt-0.5 h-4 w-4 rounded border-white/20 bg-dark-card"
                    required
                  />
                  <span>Согласен(а) на обработку персональных данных</span>
                </label>

                {submitError && <p className="text-sm text-red-300">{submitError}</p>}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full gradient-btn px-5 py-3.5 text-sm sm:text-base disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? "Отправляем..." : "Посчитать условия ипотеки без банков"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

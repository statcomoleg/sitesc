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

const ipotekaCases = [
  {
    title: "Красногорск — 19.7 млн ₽",
    description: "4к квартира, 127 кв./м. Первоначальный взнос 20%, срок 20 лет, ставка 26%.",
    image: "/reviews/ip1.png",
    result: "Одобрено 19.7 млн ₽",
  },
  {
    title: "Мурино — 6.5 млн ₽",
    description: "1к квартира, 34 кв./м., Ленинградская область. Взнос 20%, срок 20 лет, ставка 27%.",
    image: "/reviews/ip2.png",
    result: "Одобрено 6.5 млн ₽",
  },
  {
    title: "Аннино — 7.2 млн ₽",
    description: "2к квартира, 58 кв./м., Ленинградская область. Взнос 20%, срок 12 лет, ставка 27%.",
    image: "/reviews/ip3.png",
    result: "Одобрено 7.2 млн ₽",
  },
];

interface LeadFormProps {
  horizontal?: boolean;
}

function LeadForm({ horizontal = false }: LeadFormProps) {
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
          pageUrl: typeof window !== "undefined" ? window.location.href : "estateliz",
          source: "estateliz",
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

  if (submitted) {
    return (
      <div className="text-center py-6">
        <p className="text-sm font-semibold uppercase text-primary">Заявка отправлена</p>
        <h3 className="mt-2 font-[family-name:var(--font-heading)] text-xl font-bold text-text">
          Спасибо! Мы скоро свяжемся с вами
        </h3>
        <p className="mt-2 text-sm text-text-muted">
          Менеджер подготовит расчёты и напишет вам по указанному номеру.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={horizontal ? "space-y-3" : "space-y-4"}>
      {horizontal ? (
        <>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="flex-1 block">
              <span className="mb-1.5 block text-sm text-text-muted">Имя</span>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/60"
                placeholder="Введите имя"
                required
              />
            </label>
            <label className="flex-1 block">
              <span className="mb-1.5 block text-sm text-text-muted">Номер телефона</span>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/60"
                placeholder="+7 (999) 123-45-67"
                required
              />
            </label>
            <button
              type="submit"
              disabled={!canSubmit}
              className="gradient-btn shrink-0 px-6 py-3 text-sm sm:text-base disabled:cursor-not-allowed disabled:opacity-50 sm:self-end"
            >
              {submitting ? "Отправляем..." : "Посчитать условия"}
            </button>
          </div>
          <label className="flex items-start gap-2.5 text-xs text-text-muted">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setForm((prev) => ({ ...prev, consent: e.target.checked }))}
              className="mt-0.5 h-4 w-4 rounded border-white/20 bg-dark-card"
              required
            />
            <span>Согласен(а) на обработку персональных данных</span>
          </label>
        </>
      ) : (
        <>
          <label className="block">
            <span className="mb-1.5 block text-sm text-text-muted">Имя</span>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
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
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/60"
              placeholder="+7 (999) 123-45-67"
              required
            />
          </label>
          <label className="flex items-start gap-2.5 text-xs text-text-muted">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setForm((prev) => ({ ...prev, consent: e.target.checked }))}
              className="mt-0.5 h-4 w-4 rounded border-white/20 bg-dark-card"
              required
            />
            <span>Согласен(а) на обработку персональных данных</span>
          </label>
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full gradient-btn px-5 py-3.5 text-sm sm:text-base disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Отправляем..." : "Посчитать условия ипотеки без банков"}
          </button>
        </>
      )}
      {submitError && <p className="text-sm text-red-300">{submitError}</p>}
    </form>
  );
}

export function EstateLizLanding() {
  return (
    <div className="min-h-screen bg-dark text-text">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
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
          {/* Header bar */}
          <div className="mb-8 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-6">
              <p className="font-[family-name:var(--font-heading)] text-xl font-bold gradient-text sm:text-2xl">
                СТАТКРЕДИТ
              </p>
              <p className="max-w-3xl text-xs leading-relaxed text-text-muted sm:ml-auto sm:text-right sm:text-sm">
                Мы выдаём ипотеку без банков на 20 лет и с первоначальным взносом 20%. Ваша кредитная история и
                доход не имеют значения, вы получите одобрение.
              </p>
            </div>
          </div>

          {/* Hero content */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
            <div className="rounded-3xl border border-white/10 bg-black/35 p-5 backdrop-blur-md sm:p-8">
              <h1 className="font-[family-name:var(--font-heading)] text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-tight gradient-text">
                Банки отказывают в ипотеке?
              </h1>
              <p className="mt-3 font-[family-name:var(--font-heading)] text-[clamp(1rem,2vw,1.5rem)] font-semibold leading-snug text-text">
                Мы не откажем и поможем купить любую недвижимость за 20% от стоимости в Москве, Санкт-Петербурге и областях!
              </p>

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

            {/* Form */}
            <div className="gradient-border p-5 sm:p-7">
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-text sm:text-xl leading-snug mb-3">
                Хотите мы подсчитаем ваш ежемесячный платёж?
              </h2>
              <p className="text-sm leading-relaxed text-text-muted sm:text-base mb-4">
                Заполните форму и мы дадим вам все расчёты, чтобы вы посчитали, выгоден ли этот вариант вам.
              </p>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Cases ── */}
      <section className="bg-dark py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.2rem,2.5vw,1.9rem)] font-bold text-text mb-8 sm:mb-10">
            Вот недвижимость, которую мы купили для клиентов без банков:
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ipotekaCases.map((c) => (
              <div key={c.title} className="glass-card overflow-hidden flex flex-col">
                <div className="relative h-48 sm:h-52 overflow-hidden rounded-t-3xl">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-xs font-semibold text-text">
                    {c.result}
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-4 sm:p-5">
                  <p className="font-[family-name:var(--font-heading)] text-base font-semibold text-text">
                    {c.title}
                  </p>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">{c.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Scheme text */}
          <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <p className="text-base sm:text-lg text-text-muted leading-relaxed">
              Мы покупаем недвижимость у продавца, заключаем с вами договор, вы платите как по ипотеке в банке
              и дальше эта недвижимость переходит к вам в собственность.
            </p>
          </div>

          {/* Gradient heading */}
          <h2 className="mt-10 font-[family-name:var(--font-heading)] text-[clamp(1.4rem,3vw,2.4rem)] font-bold gradient-text leading-tight">
            С любой кредитной историей и без официального дохода
          </h2>
        </div>
      </section>

      {/* ── Bottom form ── */}
      <section className="bg-dark-lighter py-12 sm:py-16 border-t border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="gradient-border p-6 sm:p-8 lg:p-10">
            <h2 className="font-[family-name:var(--font-heading)] text-lg sm:text-xl font-semibold text-text mb-2">
              Хотите мы подсчитаем ваш ежемесячный платёж?
            </h2>
            <p className="text-sm text-text-muted mb-6">
              Заполните форму и мы дадим вам все расчёты, чтобы вы посчитали, выгоден ли этот вариант вам.
            </p>
            <LeadForm horizontal />
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type QuestionKey =
  | "location"
  | "propertyType"
  | "objectStatus"
  | "objectPrice"
  | "hasDownPayment"
  | "purchaseTimeline";

type QuizAnswers = Record<QuestionKey, string>;

type MessengerType = "MAX" | "WhatsApp" | "Telegram";

interface LeadFormState {
  name: string;
  city: string;
  phone: string;
  messenger: MessengerType;
  consent: boolean;
}

interface OptionQuestion {
  key: QuestionKey;
  title: string;
  type: "option";
  options: string[];
  imageSrc: string;
}

interface InputQuestion {
  key: QuestionKey;
  title: string;
  type: "input";
  placeholder: string;
  imageSrc: string;
}

type Question = OptionQuestion | InputQuestion;

const questions: Question[] = [
  {
    key: "location",
    title: "В каком месте рассматриваете покупку объекта?",
    type: "option",
    options: ["Москва", "Московская область", "Санкт-Петербург", "Ленинградская область"],
    imageSrc: "/g1.jpg",
  },
  {
    key: "objectPrice",
    title: "Какая приблизительная стоимость объекта?",
    type: "input",
    placeholder: "Введите сумму в рублях",
    imageSrc: "/g2.jpg",
  },
  {
    key: "hasDownPayment",
    title: "Есть ли у вас первоначальный взнос в размере 20% от стоимости объекта?",
    type: "option",
    options: ["Да, есть", "Пока нет"],
    imageSrc: "/g3.jpg",
  },
];

const cityOptions = ["Москва", "Московская область", "Санкт-Петербург", "Ленинградская область"];
const initialAnswers: QuizAnswers = {
  location: "",
  propertyType: "",
  objectStatus: "",
  objectPrice: "",
  hasDownPayment: "",
  purchaseTimeline: "",
};

const initialForm: LeadFormState = {
  name: "",
  city: "",
  phone: "",
  messenger: "Telegram",
  consent: false,
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);
}

function normalizeNumberInput(raw: string): string {
  return raw.replace(/[^\d]/g, "");
}

function toRegionForm(city: string): string {
  if (city === "Москва") return "в Москве";
  if (city === "Московская область") return "в Московской области";
  if (city === "Санкт-Петербург") return "в Санкт-Петербурге";
  if (city === "Ленинградская область") return "в Ленинградской области";
  return "в выбранном регионе";
}

export function IpotekaQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
  const [form, setForm] = useState<LeadFormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  const totalSteps = questions.length + 1;
  const isQuestionStep = step < questions.length;
  const currentQuestion = isQuestionStep ? questions[step] : null;
  const showTopOffer = step === 0 || !isQuestionStep;
  const priceNumber = Number(answers.objectPrice || 0);
  const downPayment = Math.round(priceNumber * 0.2);

  const progress = useMemo(() => {
    if (submitted) return 100;
    return Math.round(((step + 1) / totalSteps) * 100);
  }, [step, submitted, totalSteps]);

  const cityFromAnswers = answers.location && cityOptions.includes(answers.location) ? answers.location : "";
  const effectiveCity = form.city || cityFromAnswers;

  const isCurrentStepValid = (() => {
    if (!currentQuestion) return false;
    const value = answers[currentQuestion.key];
    if (currentQuestion.type === "input") {
      return Number(value) > 0;
    }
    return Boolean(value);
  })();

  const canSubmit =
    form.name.trim().length >= 2 &&
    Boolean(effectiveCity) &&
    form.phone.trim().length >= 8 &&
    Boolean(form.messenger) &&
    form.consent;

  const handleNext = () => {
    if (!isCurrentStepValid || !isQuestionStep) return;
    setStep((prev) => Math.min(prev + 1, questions.length));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/quiz-ipoteka", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          lead: {
            ...form,
            city: effectiveCity,
          },
          computed: {
            downPayment,
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

  const handleRestart = () => {
    setStep(0);
    setAnswers(initialAnswers);
    setForm(initialForm);
    setSubmitError("");
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <section className="relative min-h-screen bg-dark py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="gradient-border p-8 sm:p-10 text-center">
            <p className="text-primary font-semibold tracking-wide uppercase text-sm">Заявка отправлена</p>
            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-text">
              Спасибо! Мы скоро свяжемся с вами
            </h1>
            <p className="mt-4 text-text-muted max-w-2xl mx-auto">
              Данные переданы менеджеру. Подготовим персональное предложение и напишем вам в выбранный мессенджер.
            </p>
            <button
              type="button"
              onClick={handleRestart}
              className="mt-7 cursor-pointer rounded-xl border border-primary/40 bg-primary/10 px-6 py-3 text-sm sm:text-base text-text hover:bg-primary/20 transition-all duration-200"
            >
              Ошиблись? Заполните заявку заново!
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-dark py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {showTopOffer && (
          <div className="mb-5 sm:mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4 lg:gap-6 items-start rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.02] via-white/[0.01] to-primary/[0.08] p-4 sm:p-5">
              <div className="space-y-3">
                <p className="font-[family-name:var(--font-heading)] text-lg sm:text-xl font-bold gradient-text tracking-wide">
                  СТАТКРЕДИТ
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-xs sm:text-sm font-semibold text-text">
                    До 20 лет
                  </span>
                  <span className="rounded-full border border-sand/40 bg-sand/15 px-3 py-1 text-xs sm:text-sm font-semibold text-text">
                    Первичный взнос 20%
                  </span>
                  <span className="rounded-full border border-white/20 bg-white/[0.05] px-3 py-1 text-xs sm:text-sm font-semibold text-text">
                    Одобрение при любой КИ
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-text lg:text-right">
                Мы выдаём ипотеку без банков на <span className="gradient-text font-semibold">20 лет</span> и с
                первоначальным взносом <span className="gradient-text font-semibold">20%</span>. Ваша кредитная
                история и доход не имеют значения, вы получите одобрение. Оставьте заявку, чтобы мы подготовили
                для вас персональное предложение.
              </p>
            </div>
          </div>
        )}

        <div className="gradient-border p-5 sm:p-8">
          <div>
            <div className="flex items-center justify-between gap-3 text-xs sm:text-sm text-text-muted">
              <span>Прогресс</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-sand transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8 items-start">
            <div className="space-y-5">
              {isQuestionStep && currentQuestion && (
                <>
                  <p className="text-primary text-sm font-semibold">
                    Вопрос {step + 1} из {questions.length}
                  </p>
                  <h1 className="font-[family-name:var(--font-heading)] text-[clamp(1.35rem,2.8vw,2.1rem)] font-semibold text-text leading-tight">
                    {currentQuestion.title}
                  </h1>

                  {currentQuestion.key === "hasDownPayment" && priceNumber > 0 && (
                    <p className="text-text-muted text-sm sm:text-base">
                      По предварительным расчетам сумма составит{" "}
                      <span className="text-text font-semibold">{formatCurrency(downPayment)}</span>.
                    </p>
                  )}

                  {currentQuestion.type === "option" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentQuestion.options.map((option) => {
                        const selected = answers[currentQuestion.key] === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() =>
                              setAnswers((prev) => ({
                                ...prev,
                                [currentQuestion.key]: option,
                              }))
                            }
                            className={`cursor-pointer rounded-2xl border px-4 py-4 text-left transition-all duration-200 ${
                              selected
                                ? "border-primary bg-primary/12 text-text"
                                : "border-white/10 bg-white/[0.02] text-text-muted hover:border-primary/60 hover:text-text"
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <label className="block">
                      <span className="sr-only">Стоимость объекта</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder={currentQuestion.placeholder}
                        value={answers.objectPrice}
                        onChange={(event) =>
                          setAnswers((prev) => ({
                            ...prev,
                            objectPrice: normalizeNumberInput(event.target.value),
                          }))
                        }
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3.5 text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/60"
                      />
                    </label>
                  )}

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="cursor-pointer rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-text-muted hover:text-text hover:border-white/25 transition-all duration-200"
                      >
                        Назад
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!isCurrentStepValid}
                      className="cursor-pointer gradient-btn px-6 py-3 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Следующий вопрос
                    </button>
                  </div>
                </>
              )}

              {!isQuestionStep && (
                <form onSubmit={onSubmit} className="space-y-5">
                  <p className="text-primary text-sm font-semibold tracking-wide uppercase">Хорошая новость!</p>
                  <h1 className="font-[family-name:var(--font-heading)] text-[clamp(1.35rem,2.8vw,2.1rem)] font-semibold text-text leading-tight">
                    Мы можем выдать ипотеку {toRegionForm(answers.location)}
                  </h1>
                  <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                    Сумма: <span className="text-text font-semibold">{formatCurrency(priceNumber)}</span>, первичный
                    взнос: <span className="text-text font-semibold">{formatCurrency(downPayment)}</span>. Ипотека
                    выдается без банков, по схожему принципу и ставке. Для нас не критичны кредитная история и
                    подтверждение дохода.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      <span className="mb-1.5 block text-sm text-text-muted">Город</span>
                      <select
                        value={effectiveCity}
                        onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))}
                        className={`ipoteka-city-select w-full rounded-xl border border-white/10 bg-dark-card px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/60 appearance-none cursor-pointer font-medium ${
                          effectiveCity ? "gradient-text" : "text-text-muted"
                        }`}
                        required
                      >
                        <option value="">Выберите город</option>
                        {cityOptions.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-1.5 block text-sm text-text-muted">Номер телефона для связи</span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/60"
                      placeholder="+7 (999) 123-45-67"
                      required
                    />
                  </label>

                  <fieldset>
                    <legend className="mb-2 text-sm text-text-muted">Куда написать?</legend>
                    <div className="flex flex-wrap gap-2">
                      {(["MAX", "WhatsApp", "Telegram"] as MessengerType[]).map((messenger) => {
                        const selected = form.messenger === messenger;
                        return (
                          <button
                            key={messenger}
                            type="button"
                            onClick={() => setForm((prev) => ({ ...prev, messenger }))}
                            className={`cursor-pointer rounded-xl border px-4 py-2.5 text-sm transition-all ${
                              selected
                                ? "border-primary bg-primary/12 text-text"
                                : "border-white/10 text-text-muted hover:text-text hover:border-primary/60"
                            }`}
                          >
                            {messenger}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <label className="flex items-start gap-2.5 text-sm text-text-muted">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(event) => setForm((prev) => ({ ...prev, consent: event.target.checked }))}
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-dark-card"
                    />
                    <span>
                      Я согласен(а) на обработку персональных данных и принимаю условия{" "}
                      <button
                        type="button"
                        onClick={() => setIsPolicyOpen(true)}
                        className="cursor-pointer text-primary underline underline-offset-4 hover:text-sand transition-colors"
                      >
                        политики конфиденциальности
                      </button>
                      .
                    </span>
                  </label>

                  {submitError && <p className="text-sm text-red-300">{submitError}</p>}

                  <div className="flex flex-wrap gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="cursor-pointer rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-text-muted hover:text-text hover:border-white/25 transition-all duration-200"
                    >
                      Назад
                    </button>
                    <button
                      type="submit"
                      disabled={!canSubmit || submitting}
                      className="cursor-pointer gradient-btn px-6 py-3 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Отправляем..." : "Получить предложение"}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="relative min-h-[240px] sm:min-h-[320px] lg:min-h-[440px] overflow-hidden rounded-3xl border border-white/10">
              <Image
                src={isQuestionStep && currentQuestion ? currentQuestion.imageSrc : "/g4.jpg"}
                alt="Иллюстрация к шагу квиза"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 34vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/75 via-dark/25 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {isPolicyOpen && (
        <div
          className="fixed inset-0 z-[100] bg-dark/75 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Политика конфиденциальности"
        >
          <div className="w-full max-w-3xl gradient-border p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl text-text">
                Политика конфиденциальности
              </h2>
              <button
                type="button"
                onClick={() => setIsPolicyOpen(false)}
                className="cursor-pointer rounded-lg border border-white/15 px-3 py-1.5 text-sm text-text-muted hover:text-text hover:border-white/30 transition-all"
              >
                Закрыть
              </button>
            </div>

            <div className="mt-4 max-h-[60vh] overflow-y-auto rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 text-sm sm:text-base text-text-muted leading-relaxed space-y-3">
              <p>
                Оставляя заявку на сайте, вы предоставляете согласие на обработку персональных данных в
                соответствии с требованиями Федерального закона РФ от 27.07.2006 №152-ФЗ «О персональных
                данных».
              </p>
              <p>
                Мы обрабатываем следующие данные: имя, контактный телефон, выбранный мессенджер, регион
                обращения, ответы в квизе и иную информацию, которую вы добровольно указываете в форме.
              </p>
              <p>
                Цели обработки: связь с вами, подготовка и направление персонального предложения по услуге
                ипотечного сопровождения, консультация по условиям программы, а также улучшение качества
                сервиса.
              </p>
              <p>
                Обработка включает сбор, запись, систематизацию, хранение, уточнение, использование, передачу
                уполномоченным сотрудникам компании, а также удаление персональных данных по достижении целей
                обработки либо по вашему запросу, если иное не предусмотрено законодательством РФ.
              </p>
              <p>
                Персональные данные не передаются третьим лицам для самостоятельного использования, за
                исключением случаев, предусмотренных законодательством Российской Федерации.
              </p>
              <p>
                Вы можете отозвать согласие на обработку персональных данных, направив обращение по контактам,
                указанным на основном сайте компании. Отзыв согласия не влияет на законность обработки,
                осуществленной до момента его отзыва.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import { ArrowRight } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";
import { MeshGradient } from "./MeshGradient";

const stats = [
  { value: 400, suffix: "+", label: "Довольных клиентов" },
  { value: 100, suffix: "%", label: "Клиентов получают результат, если мы берём их в работу" },
  { value: 200, suffix: " млн ₽", label: "Принесли и сэкономили клиентам" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-dark">
      <MeshGradient variant="hero" />
      <div className="grain absolute inset-0" />

      <div className="absolute top-[12%] right-[6%] w-72 h-72 border border-white/[0.04] rounded-full animate-[float_14s_ease-in-out_infinite]" />
      <div className="absolute bottom-[18%] left-[3%] w-96 h-96 border border-white/[0.03] rounded-full animate-[floatSlow_11s_ease-in-out_infinite]" />
      <div className="absolute top-[38%] right-[28%] w-36 h-36 border border-sand/[0.08] rounded-full animate-[float_18s_ease-in-out_infinite]" />
      <div className="absolute bottom-[30%] right-[12%] w-20 h-20 border border-primary/10 rotate-45 animate-[floatSlow_8s_ease-in-out_infinite]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 w-full z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 glass-card !rounded-full !border-white/[0.08] mb-8 animate-[fadeInUp_0.6s_ease-out]">
              <span className="w-2 h-2 bg-primary rounded-full animate-[pulse-glow_2s_ease-in-out_infinite]" />
              <span className="text-text-muted text-sm font-medium tracking-wide">
                Более 150 довольных клиентов за 2026 год
              </span>
            </div>

            <h1 className="font-[family-name:var(--font-heading)] text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.08] tracking-tight animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
              <span className="text-text">Финансовые решения</span>
              <span className="block gradient-text mt-2">
                для физических и&nbsp;юридических лиц
              </span>
            </h1>

            <p className="mt-7 text-lg sm:text-xl text-text-muted leading-relaxed max-w-lg animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
              Помогаем получить кредит, одобрить ипотеку
              и&nbsp;навести порядок в&nbsp;финансах. Работаем
              с&nbsp;любой кредитной историей.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-[fadeInUp_0.6s_ease-out_0.35s_both]">
              <a
                href="#uslugi"
                className="group gradient-btn inline-flex items-center justify-center gap-2.5 px-9 py-4.5 text-lg"
              >
                Чем вы мне можете помочь?
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:block animate-[fadeInUp_0.7s_ease-out_0.3s_both]">
            <div className="space-y-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="glass-card p-6"
                >
                  <div className="font-[family-name:var(--font-heading)] text-3xl font-bold gradient-text">
                    <AnimatedCounter end={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-text-muted text-sm mt-1.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-16 sm:h-20"
          preserveAspectRatio="none"
        >
          <path d="M0 80 Q360 10 720 45 Q1080 80 1440 15 L1440 80 L0 80Z" fill="#111118" />
        </svg>
      </div>
    </section>
  );
}

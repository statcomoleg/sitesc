import Image from "next/image";
import { Users, CheckCircle, Banknote } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { AnimatedCounter } from "./AnimatedCounter";
import { MeshGradient } from "./MeshGradient";

const highlights = [
  { icon: Users, value: 400, suffix: "+", label: "Довольных клиентов" },
  { icon: CheckCircle, value: 100, suffix: "%", label: "Клиентов получают результат" },
  { icon: Banknote, value: 200, suffix: " млн ₽", label: "Принесли и сэкономили" },
];

export function AboutSection() {
  return (
    <section id="o-nas" className="relative py-24 sm:py-32 bg-dark-card scroll-mt-20 overflow-hidden">
      <MeshGradient variant="subtle" />

      <div className="absolute top-0 left-0 right-0">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-sand/15 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal direction="right">
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden gradient-border">
                <Image
                  src="/pic1.jpg"
                  alt="Олег С. — основатель Стат-Кредит"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              <div className="absolute -bottom-5 -right-5 w-28 h-28 bg-primary/5 rounded-3xl -z-10 rotate-6 border border-primary/10" />
              <div className="absolute -top-5 -left-5 w-20 h-20 bg-sand/5 rounded-2xl -z-10 -rotate-6 border border-sand/10" />
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 px-5 py-2 glass-card !rounded-full !p-0 px-5 py-2 text-sand text-sm font-semibold mb-4">
                <span className="w-1.5 h-1.5 bg-sand rounded-full" />
                О компании
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-text">
                Компания Стат-Кредит
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="mt-6 space-y-4 text-text-muted leading-relaxed">
                <p>
                  Мы научились решать финансовые задачи наших клиентов
                  по&nbsp;одобрению кредитов до&nbsp;100&nbsp;млн рублей,
                  выдачи ипотеки без банков, отсрочки платежей до&nbsp;1&nbsp;года
                  и&nbsp;так далее.
                </p>
                <p>
                  К&nbsp;каждому клиенту у&nbsp;нас индивидуальный подход.
                  Мы&nbsp;не&nbsp;берёмся за&nbsp;задачи, которые не&nbsp;способны
                  решить, а&nbsp;также подсказываем бесплатно, как улучшить вашу
                  ситуацию, чтобы цель была выполнена (например, как улучшить
                  кредитный рейтинг, чтобы банки выдали вам нужную сумму).
                </p>
                <p className="font-medium text-text">
                  Наши клиенты становятся нашими друзьями и&nbsp;рекомендуют нас
                  своим близким. Так что, давайте сделаем первый шаг к&nbsp;нашей
                  дружбе. С&nbsp;уважением, Олег&nbsp;С.!
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="mt-10 grid grid-cols-3 gap-4">
                {highlights.map((h) => (
                  <div
                    key={h.label}
                    className="text-center p-4 glass-card"
                  >
                    <h.icon size={22} className="mx-auto text-primary mb-2" />
                    <div className="font-[family-name:var(--font-heading)] text-xl font-bold gradient-text">
                      <AnimatedCounter end={h.value} suffix={h.suffix} />
                    </div>
                    <p className="text-text-muted text-xs mt-0.5">{h.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

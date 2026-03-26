import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";
import { visibleCases } from "@/app/data/cases";
import { CaseCard } from "./CaseCard";
import { ScrollReveal } from "./ScrollReveal";
import { MeshGradient } from "./MeshGradient";

export function TelegramCasesBanner() {
  return (
    <div className="glass-card !rounded-2xl px-6 py-4 flex items-center gap-3 flex-wrap justify-center text-center">
      <Send size={18} className="text-primary shrink-0" />
      <p className="text-text-muted text-sm sm:text-base">
        Кейсов так много… Мы собираем их и&nbsp;дополняем. Больше отзывов и&nbsp;кейсов у&nbsp;нас в{" "}
        <a
          href="https://t.me/statcredit"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-semibold hover:underline"
        >
          ТГ-канале
        </a>
      </p>
    </div>
  );
}

export function CasesSection() {
  return (
    <section id="kejsy" className="relative py-24 sm:py-32 bg-dark scroll-mt-20 overflow-hidden">
      <MeshGradient variant="subtle" />

      <div className="absolute top-0 left-0 right-0">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-5 py-2 glass-card !rounded-full !p-0 px-5 py-2 text-sand text-sm font-semibold mb-4">
              <span className="w-1.5 h-1.5 bg-sand rounded-full" />
              Кейсы
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-text">
              Реальные результаты
            </h2>
            <p className="mt-4 text-text-muted text-lg max-w-xl mx-auto">
              Истории наших клиентов, которым мы помогли решить финансовые задачи
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleCases.map((c, i) => (
            <ScrollReveal key={c.slug} delay={i * 100}>
              <CaseCard caseItem={c} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={450} className="mt-10">
          <TelegramCasesBanner />
        </ScrollReveal>

        <ScrollReveal delay={500} className="mt-10 text-center">
          <Link
            href="/kejsy"
            className="group gradient-btn inline-flex items-center gap-2.5 px-8 py-4"
          >
            Посмотреть все кейсы
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

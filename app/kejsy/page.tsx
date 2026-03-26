import type { Metadata } from "next";
import { visibleCases } from "@/app/data/cases";
import { CaseCard } from "@/app/components/CaseCard";
import { ScrollReveal } from "@/app/components/ScrollReveal";
import { MeshGradient } from "@/app/components/MeshGradient";
import { TelegramCasesBanner } from "@/app/components/CasesSection";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Все кейсы",
  description:
    "Реальные истории успеха клиентов Стат-Кредит: одобрение ипотеки, возврат страховки, исправление кредитной истории и другие результаты.",
  alternates: { canonical: "https://stat-credit.ru/kejsy" },
};

export default function AllCasesPage() {
  return (
    <section className="relative py-28 sm:py-36 bg-dark overflow-hidden">
      <MeshGradient variant="subtle" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <nav aria-label="Хлебные крошки" className="mb-8">
          <ol className="flex items-center gap-1.5 text-sm text-text-muted" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" className="hover:text-primary transition-colors" itemProp="item">
                <span itemProp="name">Главная</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li><ChevronRight size={14} /></li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-text font-medium" itemProp="name">Кейсы</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-5 py-2 glass-card !rounded-full !p-0 px-5 py-2 text-sand text-sm font-semibold mb-4">
              <span className="w-1.5 h-1.5 bg-sand rounded-full" />
              Результаты
            </span>
            <h1 className="font-[family-name:var(--font-heading)] text-[clamp(2rem,5vw,3.2rem)] font-bold text-text">
              Наши кейсы
            </h1>
            <p className="mt-4 text-text-muted text-lg max-w-xl mx-auto">
              Реальные результаты наших клиентов
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleCases.map((c, i) => (
            <ScrollReveal key={c.slug} delay={i * 80}>
              <CaseCard caseItem={c} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300} className="mt-10">
          <TelegramCasesBanner />
        </ScrollReveal>
      </div>
    </section>
  );
}

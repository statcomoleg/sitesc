import type { Metadata } from "next";
import { visibleServices } from "@/app/data/services";
import { ServiceCard } from "@/app/components/ServiceCard";
import { ScrollReveal } from "@/app/components/ScrollReveal";
import { MeshGradient } from "@/app/components/MeshGradient";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Все услуги — помощь в кредитовании, ипотека, возврат страховок",
  description:
    "Помощь в одобрении кредита, ипотека без банка, возврат навязанных страховок и исправление кредитной истории. Работаем с физическими и юридическими лицами. Бесплатная консультация!",
  keywords: [
    "помощь в одобрении кредита",
    "ипотека без банка",
    "возврат страховки по кредиту",
    "исправление кредитной истории",
    "кредитный брокер",
  ],
  alternates: { canonical: "https://stat-credit.ru/uslugi" },
};

export default function AllServicesPage() {
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
              <span className="text-text font-medium" itemProp="name">Услуги</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-5 py-2 glass-card !rounded-full !p-0 px-5 py-2 text-primary text-sm font-semibold mb-4">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Каталог услуг
            </span>
            <h1 className="font-[family-name:var(--font-heading)] text-[clamp(2rem,5vw,3.2rem)] font-bold text-text">
              Финансовые услуги для физических и юридических лиц
            </h1>
            <p className="mt-4 text-text-muted text-lg max-w-xl mx-auto">
              Одобрение кредитов, ипотека без банков, возврат страховок и исправление кредитной истории
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleServices.map((service, i) => (
            <ScrollReveal key={service.slug} delay={i * 80}>
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Услуги Стат-Кредит",
            itemListElement: visibleServices.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.title,
              url: `https://stat-credit.ru/uslugi/${s.slug}`,
            })),
          }),
        }}
      />
    </section>
  );
}

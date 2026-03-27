import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { visibleServices } from "@/app/data/services";
import { ServiceCard } from "./ServiceCard";
import { ScrollReveal } from "./ScrollReveal";
import { MeshGradient } from "./MeshGradient";

export function ServicesSection() {
  return (
    <section id="uslugi" className="relative py-24 sm:py-32 bg-dark-card scroll-mt-20 overflow-hidden">
      <MeshGradient variant="section" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-5 py-2 glass-card !rounded-full !p-0 px-5 py-2 text-primary text-sm font-semibold mb-4">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Услуги
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-text">
              Как мы помогаем получить кредит и решить финансовые задачи
            </h2>
            <p className="mt-4 text-text-muted text-lg max-w-xl mx-auto">
              Одобрение кредитов, ипотека без банков, возврат страховок и исправление кредитной истории
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleServices.map((service, i) => (
            <ScrollReveal key={service.slug} delay={i * 80}>
              <ServiceCard service={service} featured={i === 0} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={500} className="mt-14 text-center">
          <Link
            href="/uslugi"
            className="group gradient-btn inline-flex items-center gap-2.5 px-8 py-4"
          >
            Посмотреть все продукты
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

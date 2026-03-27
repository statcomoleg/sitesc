import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { visibleServices } from "@/app/data/services";
import { serviceSeoData } from "@/app/data/service-seo";
import { ContactButton } from "./ContactButton";
import { MeshGradient } from "@/app/components/MeshGradient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return visibleServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = visibleServices.find((s) => s.slug === slug);
  if (!service) return {};
  const seo = serviceSeoData[slug];
  return {
    title: seo?.title || service.title,
    description: seo?.description || service.shortDescription,
    keywords: seo?.keywords,
    alternates: { canonical: `https://stat-credit.ru/uslugi/${slug}` },
    openGraph: {
      title: `${seo?.title || service.title} | Стат-Кредит`,
      description: seo?.description || service.shortDescription,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = visibleServices.find((s) => s.slug === slug);
  if (!service) notFound();

  const seo = serviceSeoData[slug];
  const IconComponent = (LucideIcons as unknown as Record<string, ComponentType<{ size?: number; className?: string }>>)[service.icon] ?? LucideIcons.HelpCircle;

  const relatedServices = visibleServices.filter((s) => s.slug !== slug).slice(0, 2);

  return (
    <article className="relative py-28 sm:py-32 bg-dark overflow-hidden">
      <MeshGradient variant="subtle" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <nav aria-label="Хлебные крошки" className="mb-6">
          <ol className="flex items-center gap-1 text-sm text-text-muted flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" className="hover:text-primary transition-colors" itemProp="item">
                <span itemProp="name">Главная</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li><ChevronRight size={14} /></li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/uslugi" className="hover:text-primary transition-colors" itemProp="item">
                <span itemProp="name">Услуги</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li><ChevronRight size={14} /></li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-text font-medium" itemProp="name">{service.title}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>

        <div className="gradient-border p-8 sm:p-12">
          <div className="bg-dark-card rounded-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-sand/15 rounded-2xl flex items-center justify-center">
                <IconComponent size={28} className="text-primary" />
              </div>
              <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl lg:text-4xl font-bold text-text">
                {service.title}
              </h1>
            </div>

            <div className="text-text-muted leading-relaxed space-y-4">
              {service.fullDescription.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <ContactButton serviceSlug={service.slug} />
            </div>
          </div>
        </div>

        {seo?.faq && seo.faq.length > 0 && (
          <div className="mt-10 gradient-border p-8 sm:p-12">
            <h2 className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl font-bold text-text mb-6">
              Частые вопросы
            </h2>
            <div className="space-y-6">
              {seo.faq.map((item, i) => (
                <div key={i}>
                  <h3 className="font-[family-name:var(--font-heading)] text-base sm:text-lg font-semibold text-text mb-2">
                    {item.question}
                  </h3>
                  <p className="text-text-muted leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {relatedServices.length > 0 && (
          <div className="mt-10 gradient-border p-8 sm:p-12">
            <h2 className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl font-bold text-text mb-4">
              Смежные услуги
            </h2>
            <div className="space-y-3">
              {relatedServices.map((rs) => (
                <Link
                  key={rs.slug}
                  href={`/uslugi/${rs.slug}`}
                  className="block text-primary hover:text-sand transition-colors font-medium"
                >
                  {rs.title} →
                </Link>
              ))}
              <Link
                href="/kejsy"
                className="block text-sand hover:text-primary transition-colors font-medium"
              >
                Смотрите реальные результаты наших клиентов →
              </Link>
            </div>
          </div>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: seo?.description || service.shortDescription,
            provider: {
              "@type": "FinancialService",
              name: "Стат-Кредит",
              url: "https://stat-credit.ru",
            },
            areaServed:
              slug === "ipoteka-bez-ki"
                ? [
                    { "@type": "City", name: "Москва" },
                    { "@type": "City", name: "Санкт-Петербург" },
                    { "@type": "AdministrativeArea", name: "Московская область" },
                    { "@type": "AdministrativeArea", name: "Ленинградская область" },
                  ]
                : { "@type": "Country", name: "Россия" },
          }),
        }}
      />

      {seo?.faq && seo.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: seo.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Главная", item: "https://stat-credit.ru" },
              { "@type": "ListItem", position: 2, name: "Услуги", item: "https://stat-credit.ru/uslugi" },
              { "@type": "ListItem", position: 3, name: service.title, item: `https://stat-credit.ru/uslugi/${slug}` },
            ],
          }),
        }}
      />
    </article>
  );
}

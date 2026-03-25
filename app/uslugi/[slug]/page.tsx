import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { services } from "@/app/data/services";
import { ContactButton } from "./ContactButton";
import { MeshGradient } from "@/app/components/MeshGradient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.shortDescription,
    alternates: { canonical: `https://stat-credit.ru/uslugi/${slug}` },
    openGraph: {
      title: `${service.title} | Стат-Кредит`,
      description: service.shortDescription,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const IconComponent = (LucideIcons as unknown as Record<string, ComponentType<{ size?: number; className?: string }>>)[service.icon] ?? LucideIcons.HelpCircle;

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
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.shortDescription,
            provider: {
              "@type": "Organization",
              name: "Стат-Кредит",
            },
          }),
        }}
      />
    </article>
  );
}

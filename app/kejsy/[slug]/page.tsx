import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, CheckCircle } from "lucide-react";
import { visibleCases } from "@/app/data/cases";
import { CaseContactButton } from "./CaseContactButton";
import { MeshGradient } from "@/app/components/MeshGradient";
import { ReviewGallery } from "@/app/components/ReviewGallery";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return visibleCases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseItem = visibleCases.find((c) => c.slug === slug);
  if (!caseItem) return {};
  return {
    title: caseItem.title,
    description: caseItem.shortDescription,
    alternates: { canonical: `https://stat-credit.ru/kejsy/${slug}` },
    openGraph: {
      title: `${caseItem.title} | Стат-Кредит`,
      description: caseItem.shortDescription,
    },
  };
}

export default async function CasePage({ params }: PageProps) {
  const { slug } = await params;
  const caseItem = visibleCases.find((c) => c.slug === slug);
  if (!caseItem) notFound();

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
              <Link href="/kejsy" className="hover:text-primary transition-colors" itemProp="item">
                <span itemProp="name">Кейсы</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li><ChevronRight size={14} /></li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-text font-medium" itemProp="name">{caseItem.title}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>

        <div className="gradient-border p-8 sm:p-12">
          <div className="bg-dark-card rounded-2xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-block px-4 py-1.5 bg-sand/10 text-sand text-sm font-semibold rounded-full border border-sand/20">
                {caseItem.category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-green-500/10 text-green-400 text-sm font-semibold rounded-full border border-green-500/20">
                <CheckCircle size={14} />
                {caseItem.result}
              </span>
            </div>

            <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl lg:text-4xl font-bold text-text mb-8">
              {caseItem.title}
            </h1>

            <div className="text-text-muted leading-relaxed space-y-4">
              {caseItem.fullDescription.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {caseItem.screenshots && caseItem.screenshots.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/[0.06]">
                <p className="text-text font-[family-name:var(--font-heading)] font-semibold mb-4">
                  Отзыв и результаты:
                </p>
                <ReviewGallery images={caseItem.screenshots} />
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <p className="text-text font-[family-name:var(--font-heading)] font-semibold mb-4">
                Хотите такой же результат?
              </p>
              <CaseContactButton />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

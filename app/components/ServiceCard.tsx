import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { Service } from "@/app/data/services";

interface ServiceCardProps {
  service: Service;
  featured?: boolean;
}

export function ServiceCard({ service, featured = false }: ServiceCardProps) {
  const IconComponent =
    (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[service.icon] ??
    LucideIcons.HelpCircle;

  return (
    <Link
      href={`/uslugi/${service.slug}`}
      className={`group relative block gradient-border p-7 cursor-pointer transition-all duration-400 hover:-translate-y-2 glow-primary-hover overflow-hidden ${
        featured ? "sm:col-span-2 sm:flex sm:items-start sm:gap-6" : ""
      }`}
    >
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-gradient-to-br from-primary/20 to-sand/15 group-hover:from-primary/30 group-hover:to-sand/25 transition-all duration-300 group-hover:scale-110 ${
          featured ? "sm:mb-0 sm:shrink-0" : ""
        }`}
      >
        <IconComponent size={26} className="text-primary" />
      </div>

      <div>
        <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-text mb-2.5 group-hover:text-primary transition-colors duration-200">
          {service.title}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed mb-5">
          {service.shortDescription}
        </p>
        <span className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-200">
          Узнать подробнее
          <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

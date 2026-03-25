import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import type { Case } from "@/app/data/cases";

const categoryColors: Record<string, string> = {
  "Ипотека": "bg-primary/15 text-primary border-primary/20",
  "Кредитование": "bg-sienna/15 text-sand border-sienna/20",
  "Кредитные каникулы": "bg-primary/15 text-primary border-primary/20",
  "Возврат страховки": "bg-sand/15 text-sand-light border-sand/20",
  "Кредитная история": "bg-sand-light/15 text-sand border-sand-light/25",
};

export function CaseCard({ caseItem }: { caseItem: Case }) {
  const colorClass = categoryColors[caseItem.category] ?? "bg-sand/10 text-sand border-sand/15";

  return (
    <Link
      href={`/kejsy/${caseItem.slug}`}
      className="group relative block gradient-border p-7 cursor-pointer transition-all duration-400 hover:-translate-y-2 glow-primary-hover overflow-hidden"
    >
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${colorClass}`}>
          {caseItem.category}
        </span>
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded-full border border-green-500/20">
          <CheckCircle size={12} />
          {caseItem.result}
        </span>
      </div>

      <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-text mb-3 group-hover:text-primary transition-colors duration-200">
        {caseItem.title}
      </h3>

      <p className="text-text-muted text-sm leading-relaxed mb-5">
        {caseItem.shortDescription}
      </p>

      <span className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-200">
        Читать далее
        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Коммерческая тайна — канал в MAX | Стат-Кредит",
  description:
    "Канал в MAX, в котором мы рассказываем секреты банков, благодаря которым люди могут экономить деньги, получать одобрение кредитов и так далее.",
  robots: { index: true, follow: true },
};

const MAX_CHANNEL_URL =
  "https://max.ru/join/P5Ep2TX4-90DQcqG0FViwXNnWXNn7nBZ_RGOczcQBRE";

export default function KanalPage() {
  return (
    <div className="min-h-screen bg-dark flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl font-bold gradient-text hover:opacity-80 transition-opacity shrink-0"
          >
            СТАТКРЕДИТ
          </Link>
          <p className="text-text-muted text-sm text-right hidden sm:block">
            Финансовая помощь для физических и юридических лиц
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        {/* Floating decorative circles */}
        <div className="pointer-events-none">
          <div className="fixed top-[12%] right-[6%] w-72 h-72 border border-white/[0.04] rounded-full animate-[float_14s_ease-in-out_infinite]" />
          <div className="fixed bottom-[15%] left-[4%] w-96 h-96 border border-white/[0.03] rounded-full animate-[floatSlow_11s_ease-in-out_infinite]" />
          <div className="fixed top-[55%] right-[20%] w-48 h-48 border border-primary/[0.04] rounded-full animate-[float_18s_ease-in-out_infinite_reverse]" />
        </div>

        <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
          {/* Icon badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 border border-primary/20 mb-8">
            <Lock size={32} className="text-primary" />
          </div>

          {/* Heading */}
          <h1 className="font-[family-name:var(--font-heading)] text-[clamp(1.8rem,5vw,3.2rem)] font-bold leading-tight">
            <span className="gradient-text">Коммерческая</span>
            <br />
            <span className="text-text">тайна</span>
          </h1>

          {/* Divider */}
          <div className="mt-6 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {/* Description */}
          <p className="mt-6 text-text-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Канал в MAX, в котором мы рассказываем секреты банков, благодаря
            которым люди могут{" "}
            <span className="text-text font-medium">экономить деньги</span>,{" "}
            <span className="text-text font-medium">
              получать одобрение кредитов
            </span>{" "}
            и так далее.
          </p>

          {/* CTA Button */}
          <div className="mt-10">
            <a
              href={MAX_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-btn inline-flex items-center gap-2.5 px-8 py-4 text-base sm:text-lg font-semibold"
            >
              Перейти в канал MAX
              <ExternalLink size={20} />
            </a>
          </div>

          {/* Trust note */}
          <p className="mt-6 text-text-muted/50 text-sm">
            Откроется в новом окне · Бесплатно
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="text-center">
          <Link
            href="/"
            className="font-[family-name:var(--font-heading)] text-lg font-bold gradient-text hover:opacity-80 transition-opacity"
          >
            СТАТКРЕДИТ
          </Link>
          <p className="mt-2 text-text-muted/50 text-sm">
            &copy; {new Date().getFullYear()} Стат-Кредит
          </p>
        </div>
      </footer>
    </div>
  );
}

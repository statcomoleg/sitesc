"use client";

import Link from "next/link";
import { Send, Phone, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

const quickLinks = [
  { label: "Главная", href: "/" },
  { label: "Услуги", href: "/uslugi" },
  { label: "Кейсы", href: "/kejsy" },
];

const serviceLinks = [
  { label: "Помощь в одобрении кредита", href: "/uslugi/odobrenie-kredita" },
  { label: "Ипотека без банка", href: "/uslugi/ipoteka-bez-ki" },
  { label: "Возврат кредитной страховки", href: "/uslugi/vozvrat-strakhovki" },
  { label: "Исправление кредитной истории", href: "/uslugi/uluchshenie-ki" },
];

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/ipoteka") || pathname.startsWith("/ipbezbank") || pathname.startsWith("/partners") || pathname.startsWith("/kanal") || pathname.startsWith("/kanikuly")) {
    return null;
  }

  if (pathname.startsWith("/mexico")) {
    return (
      <footer className="relative bg-dark border-t border-white/[0.06]" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-text-muted/60 text-sm">
            &copy; 2026 Стат-Кредит. Все права защищены.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative bg-dark overflow-hidden" role="contentinfo">
      <div className="absolute top-0 left-0 right-0">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      </div>

      <div className="grain absolute inset-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-[family-name:var(--font-heading)] text-2xl font-bold gradient-text hover:opacity-80 transition-opacity duration-200"
            >
              Стат-Кредит
            </Link>
            <p className="mt-3 text-text-muted text-sm leading-relaxed max-w-xs">
              Помогаем там, где другие отказывают
            </p>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-text uppercase tracking-wider mb-4">
              Навигация
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-1 text-text-muted text-sm hover:text-text transition-colors duration-200 cursor-pointer"
                  >
                    {l.label}
                    <ArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-text uppercase tracking-wider mb-4">
              Услуги
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-1 text-text-muted text-sm hover:text-text transition-colors duration-200 cursor-pointer"
                  >
                    {l.label}
                    <ArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-text uppercase tracking-wider mb-4">
              Мессенджеры
            </h3>
            <div className="space-y-2.5">
              <a
                href="https://t.me/olegstatcom"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-4 py-2.5 glass-card !rounded-xl cursor-pointer"
                aria-label="Telegram"
              >
                <Send size={16} className="text-primary" />
                <span className="text-sm text-text-muted">Telegram</span>
              </a>
              <a
                href="https://wa.me/79331792306"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-4 py-2.5 glass-card !rounded-xl cursor-pointer"
                aria-label="WhatsApp"
              >
                <Phone size={16} className="text-primary" />
                <span className="text-sm text-text-muted">WhatsApp</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-text uppercase tracking-wider mb-4">
              Реквизиты
            </h3>
            <div className="text-text-muted text-sm leading-relaxed space-y-1.5">
              <p className="text-text font-medium">ИП СТАТИВКИН ОЛЕГ ВЛАДИСЛАВОВИЧ</p>
              <p>ИНН: 263410886409</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-3 text-text-muted/50 text-sm">
          <p>&copy; {new Date().getFullYear()} Стат-Кредит. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

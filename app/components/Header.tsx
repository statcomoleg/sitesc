"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useContactModal } from "./ContactModal";

const navItems = [
  { label: "Главная", href: "/" },
  { label: "Услуги", href: "/#uslugi" },
  { label: "Кейсы", href: "/#kejsy" },
  { label: "О нас", href: "/#o-nas" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { openModal } = useContactModal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (pathname === "/" && href.startsWith("/#")) {
      const id = href.slice(2);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (pathname.startsWith("/mexico") || pathname.startsWith("/ipoteka") || pathname.startsWith("/ipbezbank") || pathname.startsWith("/partners") || pathname.startsWith("/kanal") || pathname.startsWith("/kanikuly")) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link
            href="/"
            className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl font-bold gradient-text hover:opacity-80 transition-opacity duration-200"
          >
            Стат-Кредит
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Основная навигация">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className="px-4 py-2 text-sm font-medium text-text-muted hover:text-text rounded-xl hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openModal()}
              className="hidden sm:inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-xl border border-white/[0.08] bg-white/[0.02] text-text-muted/80 hover:text-text-muted hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-200 cursor-pointer"
            >
              Обратиться за помощью
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-text-muted hover:text-text transition-colors cursor-pointer"
              aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-dark/95 backdrop-blur-xl border-t border-white/[0.06]">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Мобильная навигация">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className="px-4 py-3 text-base font-medium text-text-muted hover:text-text hover:bg-white/[0.04] rounded-xl transition-all duration-200 cursor-pointer"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                openModal();
              }}
              className="mt-2 w-full text-center px-4 py-3 text-sm font-medium rounded-xl border border-white/[0.08] bg-white/[0.02] text-text-muted/80 hover:text-text-muted hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-200 cursor-pointer"
            >
              Обратиться за помощью
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

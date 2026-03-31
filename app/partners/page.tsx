import type { Metadata } from "next";
import { PartnersContent } from "./PartnersContent";

export const metadata: Metadata = {
  title: "Партнёрская программа — зарабатывайте с нами | Стат-Кредит",
  description:
    "Станьте партнёром Стат-Кредит и зарабатывайте от 100 000 до 1 000 000 руб. в месяц на кредитных и финансовых продуктах. Без вложений и опыта.",
  robots: { index: false, follow: false },
};

export default function PartnersPage() {
  return <PartnersContent />;
}

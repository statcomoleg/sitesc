import type { Metadata } from "next";
import { EstateLizLanding } from "@/app/components/EstateLizLanding";

export const metadata: Metadata = {
  title: "Ипотека без банков в Москве и Санкт-Петербурге",
  description:
    "Мини-лендинг по ипотеке без банков: ставка 24%-27% годовых, первоначальный взнос от 20%, срок до 20 лет.",
  alternates: {
    canonical: "https://stat-credit.ru/estateliz",
  },
};

export default function EstateLizPage() {
  return <EstateLizLanding />;
}

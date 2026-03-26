import type { Metadata } from "next";
import { IpotekaQuiz } from "@/app/components/IpotekaQuiz";

export const metadata: Metadata = {
  title: "Ипотека без банков в Москве и Санкт-Петербурге",
  description:
    "Квиз для подбора ипотеки без банков в Москве, Московской области, Санкт-Петербурге и Ленинградской области.",
  alternates: {
    canonical: "https://stat-credit.ru/ipoteka",
  },
};

export default function IpotekaQuizPage() {
  return <IpotekaQuiz />;
}

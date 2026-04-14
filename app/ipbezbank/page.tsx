import type { Metadata } from "next";
import { IpotekaQuiz } from "@/app/components/IpotekaQuiz";

export const metadata: Metadata = {
  title: "Ипотека без банков в Москве и Санкт-Петербурге",
  description:
    "Квиз для подбора ипотеки без банков в Москве, Московской области, Санкт-Петербурге и Ленинградской области.",
  robots: { index: false, follow: false },
};

export default function IpbezBankPage() {
  return (
    <IpotekaQuiz
      apiEndpoint="/api/quiz-ipbezbank"
      telegramLink="https://t.me/andrblkb"
    />
  );
}

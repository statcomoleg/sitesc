import { HeroSection } from "@/app/components/HeroSection";
import { ServicesSection } from "@/app/components/ServicesSection";
import { CasesSection } from "@/app/components/CasesSection";
import { AboutSection } from "@/app/components/AboutSection";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            name: "Стат-Кредит",
            url: "https://stat-credit.ru",
            description:
              "Финансовая помощь: одобрение кредитов для физических и юридических лиц, ипотека без банков, возврат кредитных страховок, исправление кредитной истории",
            areaServed: [
              { "@type": "City", name: "Москва" },
              { "@type": "City", name: "Санкт-Петербург" },
              { "@type": "AdministrativeArea", name: "Московская область" },
              { "@type": "AdministrativeArea", name: "Ленинградская область" },
            ],
            serviceType: [
              "Кредитный брокер",
              "Помощь в одобрении кредита",
              "Ипотека без банков",
              "Возврат кредитных страховок",
              "Исправление кредитной истории",
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Москва",
              addressCountry: "RU",
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              availableLanguage: "Russian",
            },
            sameAs: [
              "https://t.me/olegstatcom",
              "https://t.me/statcredit",
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Можно ли получить кредит с плохой кредитной историей?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Да, мы помогаем получить одобрение кредита даже при наличии просрочек и плохой кредитной истории. На основе анализа ваших кредитных отчётов составим стратегию одобрения. Оплата только по результату.",
                },
              },
              {
                "@type": "Question",
                name: "Что такое ипотека без банка?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ипотека без банка — это альтернативный способ приобретения недвижимости через частных инвесторов. Подходит тем, кому банки отказывают из-за плохой КИ или отсутствия официального дохода. Действует в Москве, Санкт-Петербурге, МО и ЛО.",
                },
              },
              {
                "@type": "Question",
                name: "Как вернуть навязанную страховку по кредиту?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "По закону вы имеете право вернуть деньги за навязанную кредитную страховку. Мы составим претензию, при необходимости обратимся в суд и добьёмся возврата. Средний размер возврата — от 50 000 до 400 000 рублей.",
                },
              },
              {
                "@type": "Question",
                name: "Можно ли исправить плохую кредитную историю?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Да, мы используем легальные методы для исправления кредитной истории: оспариваем ошибки в БКИ, составляем план улучшения рейтинга. Средний срок — от 1 до 4 месяцев.",
                },
              },
            ],
          }),
        }}
      />
      <HeroSection />
      <ServicesSection />
      <CasesSection />
      <AboutSection />
    </>
  );
}

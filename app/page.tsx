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
            "@type": "Organization",
            name: "Стат-Кредит",
            url: "https://stat-credit.ru",
            description:
              "Профессиональная помощь в кредитовании физических и юридических лиц",
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

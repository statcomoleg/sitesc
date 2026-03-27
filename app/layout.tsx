import type { Metadata } from "next";
import { Unbounded, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ContactModalProvider } from "@/app/components/ContactModal";
import { YandexMetrikaRouteTracker } from "@/app/components/YandexMetrika";

const unbounded = Unbounded({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Помощь в получении кредита и ипотеки — финансовая помощь с гарантией результата",
    template: "%s | Стат-Кредит",
  },
  description:
    "Поможем получить кредит с плохой КИ, оформить ипотеку без банка, вернуть страховку и исправить кредитную историю. Бесплатная консультация!",
  keywords: [
    "помощь в получении кредита",
    "финансовая помощь",
    "кредитный брокер",
    "помощь с кредитом с плохой кредитной историей",
    "одобрение кредита с гарантией",
    "ипотека без банка",
    "возврат страховки по кредиту",
    "исправление кредитной истории",
  ],
  metadataBase: new URL("https://stat-credit.ru"),
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Стат-Кредит",
    title: "Помощь в получении кредита и ипотеки — Стат-Кредит",
    description:
      "Поможем получить кредит с плохой КИ, оформить ипотеку без банка, вернуть страховку и исправить кредитную историю. Бесплатная консультация!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://stat-credit.ru",
  },
  other: {
    "geo.region": "RU",
    "geo.placename": "Россия",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased bg-dark text-text">
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=108245195', 'ym');

            ym(108245195, 'init', {
              ssr: true,
              webvisor: true,
              clickmap: true,
              ecommerce: "dataLayer",
              referrer: document.referrer,
              url: location.href,
              accurateTrackBounce: true,
              trackLinks: true
            });
          `}
        </Script>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/108245195"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        <ContactModalProvider>
          <YandexMetrikaRouteTracker />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ContactModalProvider>
      </body>
    </html>
  );
}

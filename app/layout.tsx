import type { Metadata } from "next";
import { Unbounded, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ContactModalProvider } from "@/app/components/ContactModal";

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
    default: "Стат-Кредит — Помощь в кредитовании и финансовых услугах",
    template: "%s | Стат-Кредит",
  },
  description:
    "Стат-Кредит — профессиональная помощь в кредитовании физических и юридических лиц, одобрение ипотеки, кредитные каникулы, возврат страховки и исправление кредитной истории.",
  keywords: [
    "кредитование",
    "ипотека",
    "кредитная история",
    "кредитные каникулы",
    "возврат страховки",
    "помощь в кредите",
    "Стат-Кредит",
  ],
  metadataBase: new URL("https://stat-credit.ru"),
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Стат-Кредит",
    title: "Стат-Кредит — Помощь в кредитовании и финансовых услугах",
    description:
      "Профессиональная помощь в кредитовании, одобрение ипотеки с любой кредитной историей, кредитные каникулы и возврат страховки.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased bg-dark text-text">
        <ContactModalProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ContactModalProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/ui/MobileCtaBar";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Model Oils | Motor Oil & Lubricant Exporter | B2B Wholesale",
    template: "%s | Model Oils",
  },
  description:
    "Model Oils exports premium motor oils and industrial lubricants to 40+ countries. API & ISO 9001 certified. Wholesale pricing, FOB/CIF shipping. Request your bulk quote today.",
  keywords: ["motor oil bulk supplier", "lubricant exporter", "mineral oil wholesale", "industrial lubricants B2B"],
  openGraph: {
    type: "website",
    siteName: "Model Oils",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "tr" | "ru" | "fa")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const isRTL = locale === "fa";

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      className={`${inter.variable} ${sourceSerif.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent-600 focus:text-white focus:rounded-md"
          >
            Skip to main content
          </a>
          <Header locale={locale} />
          <main id="main-content">{children}</main>
          <Footer />
          <MobileCtaBar />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

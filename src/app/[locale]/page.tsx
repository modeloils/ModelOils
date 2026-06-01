import type { Metadata } from "next";
import { HeroSection } from "@/components/features/hero/HeroSection";
import { StatsBar } from "@/components/features/hero/StatsBar";
import { WhyUsSection } from "@/components/features/hero/WhyUsSection";
import { ProcessSection } from "@/components/features/hero/ProcessSection";
import { IndustriesSection } from "@/components/features/industries/IndustriesSection";
import { FinalCTASection } from "@/components/features/hero/FinalCTASection";
import { BrandsSection } from "@/components/features/brands/BrandsSection";
import { CertificationsBar } from "@/components/features/certifications/CertificationsBar";
import { BlogPreviewSection } from "@/components/features/blog/BlogPreviewSection";
import { getCertifications, getBlogPosts } from "@/lib/sanity/queries";
import { JsonLd } from "@/components/seo/JsonLd";
import { setRequestLocale } from "next-intl/server";


export const metadata: Metadata = {
  title: "Model Oils | Motor Oil & Lubricant Exporter | B2B Wholesale",
  description:
    "Model Oils exports premium motor oils and industrial lubricants to 40+ countries. API & ISO 9001 certified. Wholesale pricing, FOB/CIF shipping. Request your bulk quote today.",
};

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [certifications, posts] = await Promise.all([
    getCertifications().catch(() => []),
    getBlogPosts(3).catch(() => []),
  ]);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Model Oils",
    url: "https://www.modeloils.com",
    logo: "https://www.modeloils.com/images/logo.png",

    description:
      "International B2B exporter of motor oils, mineral oils, and industrial lubricants. ISO 9001:2015 certified. Serving distributors and industrial buyers in 40+ countries.",
    email: "info@modeloils.com",
    telephone: "+90-533-456-7975",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Üçevler Mah. İzmir Yolu Cad. No: 241/334",
      addressLocality: "Nilüfer",
      addressRegion: "Bursa",
      addressCountry: "TR",
    },
    sameAs: ["https://www.linkedin.com/company/modeloils"],
    areaServed: ["Worldwide"],
    knowsAbout: ["Motor Oils", "Mineral Oils", "Industrial Lubricants", "Lubricant Export"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Model Oils — Lubricant Exporter",
    url: "https://www.modeloils.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.modeloils.com/products?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Stats Bar */}
      <StatsBar />

      {/* 3. Brands */}
      <BrandsSection />

      {/* 4. Why Us */}
      <WhyUsSection />

      {/* 5. Process */}
      <ProcessSection />

      {/* 6. Industries */}
      <IndustriesSection />

      {/* 7. Certifications Bar */}
      <CertificationsBar certifications={certifications} />

      {/* 8. Blog Preview */}
      <BlogPreviewSection posts={posts} locale={locale} />

      {/* 9. Final CTA */}
      <FinalCTASection />
    </>
  );
}

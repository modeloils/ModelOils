import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Globe2, Clock, Building2, MapPin, Factory } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { useSafeEmail } from "@/components/SafeEmailLink";
import { CONTACT } from "@/lib/site-data";
import { getLegalContent } from "@/lib/legal";
import { useTranslation, pageHead, type Locale } from "@/lib/i18n";

export function contactHead(locale: Locale) {
  return pageHead(locale, "contact");
}

export const Route = createFileRoute("/contact")({
  head: () => contactHead("en"),
  component: Contact,
});

export function Contact() {
  const { t, locale } = useTranslation();
  const legal = getLegalContent(locale);
  const { displayEmail, mailto } = useSafeEmail();
  return (
    <SiteLayout>
      <PageHero
        eyebrow={t.contact.heroEyebrow}
        title={t.contact.heroTitle}
        subtitle={t.contact.heroSubtitle}
      />

      <section className="brand-section-green corporate-section-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.5fr] lg:px-8">
          <div className="space-y-4">
            <ContactItem
              icon={Building2}
              title={t.contact.legalName}
              value={CONTACT.legalName}
              wrap
            />
            <ContactItem
              icon={Mail}
              title={t.contact.email}
              value={displayEmail}
              href={mailto}
              interactive
            />
            <ContactItem
              icon={MessageCircle}
              title={t.contact.whatsapp}
              value={CONTACT.phone}
              href={CONTACT.whatsapp}
              interactive
              external
            />
            <ContactItem icon={MapPin} title={legal.labels.office} value={CONTACT.address} wrap />
            <ContactItem
              icon={Factory}
              title={legal.labels.factory}
              value={CONTACT.factoryAddress}
              wrap
            />
            <ContactItem
              icon={Globe2}
              title={t.contact.exportInquiries}
              value={t.contact.exportInquiriesValue}
            />
            <ContactItem
              icon={Clock}
              title={t.contact.responseTime}
              value={t.contact.responseTimeValue}
            />
            <div className="brand-card rounded-xl border border-border bg-[image:var(--gradient-panel)] p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">{t.contact.helpText}</p>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>
    </SiteLayout>
  );
}

function ContactItem({
  icon: Icon,
  title,
  value,
  wrap = false,
  href,
  interactive = false,
  external = false,
}: {
  icon: typeof Mail;
  title: string;
  value: string;
  wrap?: boolean;
  href?: string;
  interactive?: boolean;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="brand-icon grid h-11 w-11 shrink-0 place-items-center rounded-lg">
        <Icon className="h-5 w-5 text-white" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
        <p className={`text-sm font-medium text-foreground ${wrap ? "break-words" : "truncate"}`}>
          {value}
        </p>
      </div>
    </>
  );

  const className =
    "flex items-center gap-4 rounded-xl border border-border bg-card/60 p-5 transition-colors";

  if (interactive) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`${className} hover:border-primary/50 hover:bg-card`}
      >
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}

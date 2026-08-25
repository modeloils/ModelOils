import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Globe2, Clock, Building2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { CONTACT } from "@/lib/site-data";
import { useTranslation, pageHead, type Locale } from "@/lib/i18n";

export function contactHead(locale: Locale) {
  return pageHead(locale, "contact");
}

export const Route = createFileRoute("/contact")({
  head: () => contactHead("en"),
  component: Contact,
});

export function Contact() {
  const { t } = useTranslation();
  return (
    <SiteLayout>
      <PageHero
        eyebrow={t.contact.heroEyebrow}
        title={t.contact.heroTitle}
        subtitle={t.contact.heroSubtitle}
      />

      <section className="brand-section-green py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.5fr] lg:px-8">
          <div className="space-y-4">
            <ContactItem
              icon={Building2}
              title={t.contact.legalName}
              value={CONTACT.legalName}
              wrap
            />
            <ContactItem icon={Mail} title={t.contact.email} value={CONTACT.email} />
            <ContactItem icon={MessageCircle} title={t.contact.whatsapp} value={CONTACT.phone} />
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
}: {
  icon: typeof Mail;
  title: string;
  value: string;
  wrap?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card/60 p-5">
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
    </div>
  );
}

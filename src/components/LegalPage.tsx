import { Mail, MapPin, Factory } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SafeEmailLink } from "@/components/SafeEmailLink";
import { SiteLayout } from "@/components/SiteLayout";
import { customPageHead, useTranslation, type Locale } from "@/lib/i18n";
import { getLegalContent, type LegalPageKind } from "@/lib/legal";
import { CONTACT } from "@/lib/site-data";

export function legalPageHead(locale: Locale, kind: LegalPageKind) {
  const copy = getLegalContent(locale).pages[kind];

  return customPageHead(locale, {
    basePath: `/${kind}`,
    title: `${copy.title} | MODEL GRUP`,
    description: copy.description,
  });
}

export function LegalPage({ kind }: { kind: LegalPageKind }) {
  const { locale } = useTranslation();
  const legal = getLegalContent(locale);
  const page = legal.pages[kind];

  return (
    <SiteLayout>
      <PageHero eyebrow={page.eyebrow} title={page.title} subtitle={page.description} compact />

      <section className="brand-section-neutral py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="mb-10 text-sm font-medium text-muted-foreground">{legal.labels.updated}</p>

          <div className="space-y-10">
            {page.sections.map((section, index) => {
              const sectionId = `legal-section-${index + 1}`;
              return (
                <section key={section.title} aria-labelledby={sectionId}>
                  <h2 id={sectionId} className="font-display text-2xl font-bold text-foreground">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-7 text-muted-foreground sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <section className="brand-card mt-12 rounded-xl border border-border bg-[image:var(--gradient-panel)] p-6">
            <h2 className="font-display text-xl font-bold text-foreground">
              {legal.labels.contact}
            </h2>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <SafeEmailLink className="flex min-h-[44px] items-center gap-2 hover:text-primary">
                {(email) => (
                  <>
                    <Mail className="h-4 w-4 shrink-0" /> {email}
                  </>
                )}
              </SafeEmailLink>
              <p className="flex items-start gap-2">
                <MapPin className="mt-1 h-4 w-4 shrink-0" />
                <span>
                  <strong className="text-foreground">{legal.labels.office}:</strong>{" "}
                  {CONTACT.address}
                </span>
              </p>
              <p className="flex items-start gap-2">
                <Factory className="mt-1 h-4 w-4 shrink-0" />
                <span>
                  <strong className="text-foreground">{legal.labels.factory}:</strong>{" "}
                  {CONTACT.factoryAddress}
                </span>
              </p>
            </div>
          </section>
        </div>
      </section>
    </SiteLayout>
  );
}

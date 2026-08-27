import { useState } from "react";
import { toast } from "sonner";
import { LocaleLink, useTranslation } from "@/lib/i18n";
import { getLegalContent } from "@/lib/legal";
import { PACKAGING } from "@/lib/site-data";
import { getYokohamaCategoryName, YOKOHAMA_CATEGORY_DEFINITIONS } from "@/lib/yokohama-categories";

export function QuoteForm() {
  const { t, locale } = useTranslation();
  const legal = getLegalContent(locale);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY ?? "");
    formData.append("subject", "MODEL GRUP — New Quote Request");
    formData.append("from_name", "MODEL GRUP Website");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        (e.target as HTMLFormElement).reset();
        toast.success(t.form.toastTitle, { description: t.form.toastBody });
      } else {
        toast.error(t.form.errorTitle, { description: t.form.errorBody });
      }
    } catch {
      toast.error(t.form.errorTitle, { description: t.form.networkError });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={submitting}
      className="brand-card corporate-form-surface space-y-4 rounded-2xl border border-border bg-[image:var(--gradient-panel)] p-6 lg:p-8"
    >
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.form.name} name="name" autoComplete="name" required />
        <Field label={t.form.company} name="company" autoComplete="organization" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.form.country} name="country" autoComplete="country-name" required />
        <Field label={t.form.email} name="email" type="email" autoComplete="email" required />
      </div>
      <Field label={t.form.phone} name="phone" type="tel" autoComplete="tel" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="quote-product-interest"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            {t.form.productInterest}
          </label>
          <select
            id="quote-product-interest"
            name="product_interest"
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">{t.form.selectCategory}</option>
            {YOKOHAMA_CATEGORY_DEFINITIONS.map(({ slug }) => (
              <option key={slug} value={getYokohamaCategoryName(slug, locale)}>
                {getYokohamaCategoryName(slug, locale)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="quote-packaging"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            {t.form.packagingPref}
          </label>
          <select
            id="quote-packaging"
            name="packaging"
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">{t.form.selectPackaging}</option>
            {PACKAGING.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Field label={t.form.quantity} name="quantity" placeholder={t.form.quantityPlaceholder} />

      <div>
        <label
          htmlFor="quote-message"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          {t.form.message}
        </label>
        <textarea
          id="quote-message"
          name="message"
          rows={4}
          placeholder={t.form.messagePlaceholder}
          className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <p id="quote-privacy-note" className="text-xs leading-relaxed text-muted-foreground">
        {legal.formNotice}{" "}
        <LocaleLink
          to="/privacy"
          className="font-semibold text-foreground underline-offset-2 hover:underline"
        >
          {legal.labels.privacy}
        </LocaleLink>{" "}
        ·{" "}
        <LocaleLink
          to="/kvkk"
          className="font-semibold text-foreground underline-offset-2 hover:underline"
        >
          {legal.labels.kvkk}
        </LocaleLink>
      </p>

      <button
        type="submit"
        disabled={submitting}
        aria-describedby="quote-privacy-note"
        className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[#B9141A] disabled:opacity-60"
      >
        {submitting ? t.form.submitting : t.form.submit}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  const id = `quote-${name.replace(/_/g, "-")}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
      >
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
    </div>
  );
}

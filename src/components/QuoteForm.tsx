import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "@/lib/i18n";
import { PACKAGING } from "@/lib/site-data";

export function QuoteForm() {
  const { t, data } = useTranslation();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY ?? "");
    formData.append("subject", "Model Oils — New Quote Request");
    formData.append("from_name", "Model Oils Website");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
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
      className="space-y-4 rounded-2xl border border-border bg-[image:var(--gradient-panel)] p-6 lg:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.form.name} name="name" required />
        <Field label={t.form.company} name="company" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.form.country} name="country" required />
        <Field label={t.form.email} name="email" type="email" required />
      </div>
      <Field label={t.form.phone} name="phone" type="tel" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t.form.productInterest}
          </label>
          <select
            name="product_interest"
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">{t.form.selectCategory}</option>
            {data.categories.map((c) => (
              <option key={c.slug ?? c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t.form.packagingPref}
          </label>
          <select
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
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t.form.message}
        </label>
        <textarea
          name="message"
          rows={4}
          placeholder={t.form.messagePlaceholder}
          className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
    </div>
  );
}

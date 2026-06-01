"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import {
  QuoteFormStep1Schema,
  QuoteFormStep2Schema,
  type QuoteFormStep1Data,
  type QuoteFormStep2Data,
} from "@/lib/schemas/quote-form";
import { ArrowRight, ArrowLeft, CheckCircle, MessageCircle } from "lucide-react";

type Step = 1 | 2;

const PRODUCT_TYPES = [
  { value: "motor-oils", label: "Motor Oils" },
  { value: "mineral-oils", label: "Mineral Oils" },
  { value: "industrial-lubricants", label: "Industrial Lubricants" },
  { value: "gear-oils", label: "Gear Oils" },
  { value: "other", label: "Other / Not Sure" },
] as const;

const UNITS = [
  { value: "liters", label: "Liters" },
  { value: "metric-tons", label: "Metric Tons" },
  { value: "drums", label: "Drums (205L)" },
  { value: "ibcs", label: "IBCs (1,000L)" },
] as const;

const HOW_FOUND = [
  { value: "google", label: "Google Search" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "trade-show", label: "Trade Show" },
  { value: "referral", label: "Partner Referral" },
  { value: "directory", label: "Industry Directory" },
  { value: "other", label: "Other" },
] as const;

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  required?: boolean;
  error?: string | undefined;
  hint?: string | undefined;
}

function Field({ label, required, error, hint, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-sm font-semibold text-brand-800">
        {label} {required && <span className="text-accent-600" aria-label="required">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-brand-500">{hint}</p>}
      {error && <p className="text-xs text-red-600 flex items-center gap-1">{error}</p>}
    </div>
  );
}

const inputClass = cn(
  "w-full h-12 px-3.5 rounded-[var(--radius-card)] border-[1.5px] border-brand-200 bg-white",
  "text-brand-900 text-sm placeholder:text-brand-400",
  "focus:outline-none focus:border-accent-600 focus:ring-2 focus:ring-accent-600/15",
  "transition-colors duration-150"
);

export function QuoteForm({ defaultProductSpec }: { defaultProductSpec?: string }) {
  const t = useTranslations("quote");
  const [step, setStep] = useState<Step>(1);
  const [step1Data, setStep1Data] = useState<QuoteFormStep1Data | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const form1 = useForm<QuoteFormStep1Data>({
    resolver: zodResolver(QuoteFormStep1Schema),
    defaultValues: {
      productType: "motor-oils",
      productSpec: defaultProductSpec ?? "",
      quantity: undefined as unknown as number,
      unit: "liters",
      packaging: [],
      destinationCountry: "",
    },
  });

  const form2 = useForm<QuoteFormStep2Data>({
    resolver: zodResolver(QuoteFormStep2Schema),
    defaultValues: {
      fullName: "",
      jobTitle: "",
      companyName: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  const onStep1Submit = (data: QuoteFormStep1Data) => {
    setStep1Data(data);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onStep2Submit = async (data: QuoteFormStep2Data) => {
    if (!step1Data) return;
    setSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...step1Data, ...data }),
      });
      const json = (await res.json()) as { success: boolean; reference?: string; error?: string };

      if (json.success) {
        setReference(json.reference ?? null);
        setSubmitted(true);
      } else {
        setServerError(json.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Success state
  if (submitted) {
    return (
      <div className="bg-brand-800 rounded-xl p-8 text-center flex flex-col items-center gap-4">
        <CheckCircle className="h-12 w-12 text-accent-500" aria-hidden="true" />
        <h3 className="text-white text-xl font-bold">{t("successTitle")}</h3>
        <p className="text-brand-300 text-sm leading-relaxed max-w-[400px]">
          {t("successBody")}
          {reference && (
            <span className="block mt-2 text-accent-400 font-mono text-xs">
              Reference: {reference}
            </span>
          )}
        </p>
        <a
          href="https://wa.me/905334567975"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-whatsapp text-sm font-medium hover:brightness-110 transition-all mt-2"
        >
          <MessageCircle className="h-4 w-4" />
          {t("successWhatsapp")}: +90 533 456 7975
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-brand-200 overflow-hidden shadow-sm">
      {/* Progress indicator */}
      <div className="bg-brand-50 border-b border-brand-200 px-6 py-3 flex items-center gap-4">
        {[1, 2].map((n) => (
          <div key={n} className="flex items-center gap-2">
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                step >= n ? "bg-accent-600 text-white" : "bg-brand-200 text-brand-500"
              )}
            >
              {n}
            </div>
            <span className={cn("text-xs font-medium hidden sm:block", step >= n ? "text-brand-900" : "text-brand-400")}>
              {n === 1 ? "Product Requirements" : "Contact Details"}
            </span>
            {n < 2 && <span className="text-brand-300 text-xs">→</span>}
          </div>
        ))}
      </div>

      <div className="p-6 sm:p-8">
        <p className="text-[11px] text-brand-400 mb-6">{t("requiredNote")}</p>

        {/* ─── STEP 1 ─── */}
        {step === 1 && (
          <form onSubmit={form1.handleSubmit(onStep1Submit)} className="space-y-6">
            <h2 className="text-xl font-bold text-brand-900">{t("step1Title")}</h2>

            {/* Product type */}
            <Field label={t("productType")} required error={form1.formState.errors.productType?.message}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PRODUCT_TYPES.map((type) => {
                  const checked = form1.watch("productType") === type.value;
                  return (
                    <label
                      key={type.value}
                      className={cn(
                        "flex items-center gap-2 border-[1.5px] rounded-[var(--radius-card)] px-3 py-2.5 cursor-pointer transition-colors text-sm",
                        checked ? "border-accent-600 bg-accent-100/40 text-accent-700 font-medium" : "border-brand-200 text-brand-700 hover:border-brand-400"
                      )}
                    >
                      <input
                        type="radio"
                        value={type.value}
                        {...form1.register("productType")}
                        className="sr-only"
                      />
                      {type.label}
                    </label>
                  );
                })}
              </div>
            </Field>

            {/* Product spec */}
            <Field
              label={t("productSpec")}
              required
              hint={t("productSpecHelper")}
              error={form1.formState.errors.productSpec?.message}
            >
              <input
                {...form1.register("productSpec")}
                className={inputClass}
                placeholder={t("productSpecPlaceholder")}
              />
            </Field>

            {/* Quantity + unit */}
            <div className="grid grid-cols-2 gap-3">
              <Field label={t("quantity")} required error={form1.formState.errors.quantity?.message}>
                <input
                  type="number"
                  {...form1.register("quantity", { valueAsNumber: true })}
                  className={inputClass}
                  placeholder="e.g. 5000"
                  min={1}
                />
              </Field>
              <Field label={t("unit")} required error={form1.formState.errors.unit?.message}>
                <select {...form1.register("unit")} className={inputClass}>
                  {UNITS.map((u) => (
                    <option key={u.value} value={u.value}>{u.label}</option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Destination */}
            <Field
              label={t("destinationCountry")}
              required
              error={form1.formState.errors.destinationCountry?.message}
            >
              <input
                {...form1.register("destinationCountry")}
                className={inputClass}
                placeholder={t("countryPlaceholder")}
              />
            </Field>

            <Button
              type="submit"
              size="full"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              {t("continueBtn")}
            </Button>
          </form>
        )}

        {/* ─── STEP 2 ─── */}
        {step === 2 && (
          <form onSubmit={form2.handleSubmit(onStep2Submit)} className="space-y-5">
            <h2 className="text-xl font-bold text-brand-900">{t("step2Title")}</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={t("fullName")} required error={form2.formState.errors.fullName?.message}>
                <input {...form2.register("fullName")} className={inputClass} placeholder="First and last name" />
              </Field>
              <Field
                label={t("jobTitle")}
                required
                hint={t("jobTitleHelper")}
                error={form2.formState.errors.jobTitle?.message}
              >
                <input {...form2.register("jobTitle")} className={inputClass} placeholder={t("jobTitlePlaceholder")} />
              </Field>
            </div>

            <Field label={t("companyName")} required error={form2.formState.errors.companyName?.message}>
              <input {...form2.register("companyName")} className={inputClass} placeholder="Your company or organization" />
            </Field>

            <Field
              label={t("businessEmail")}
              required
              hint={t("emailHelper")}
              error={form2.formState.errors.email?.message}
            >
              <input
                {...form2.register("email")}
                type="email"
                className={inputClass}
                placeholder={t("emailPlaceholder")}
              />
            </Field>

            <Field
              label={t("phone")}
              required
              hint={t("phoneHelper")}
              error={form2.formState.errors.phone?.message}
            >
              <input
                {...form2.register("phone")}
                type="tel"
                className={inputClass}
                placeholder={t("phonePlaceholder")}
              />
            </Field>

            <Field label={t("howDidYouFind")} error={form2.formState.errors.howFound?.message}>
              <select {...form2.register("howFound")} className={inputClass}>
                <option value="">— optional —</option>
                {HOW_FOUND.map((h) => (
                  <option key={h.value} value={h.value}>{h.label}</option>
                ))}
              </select>
            </Field>

            <Field label={t("notes")} error={form2.formState.errors.notes?.message}>
              <textarea
                {...form2.register("notes")}
                className={cn(inputClass, "h-28 resize-none py-3")}
                placeholder={t("notesPlaceholder")}
                maxLength={2000}
              />
            </Field>

            {/* Consent */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="acceptedTerms"
                {...form2.register("acceptedTerms")}
                className="mt-0.5 accent-amber-600 w-4 h-4"
              />
              <label htmlFor="acceptedTerms" className="text-xs text-brand-600 leading-relaxed">
                {t("consent")}{" "}
                <a href="/privacy" className="text-accent-600 underline hover:text-accent-500" target="_blank">
                  Privacy Policy
                </a>
              </label>
            </div>
            {form2.formState.errors.acceptedTerms && (
              <p className="text-xs text-red-600">{form2.formState.errors.acceptedTerms.message}</p>
            )}

            {serverError && (
              <div className="bg-red-50 border border-red-200 rounded-md px-4 py-3 text-sm text-red-700">
                {serverError}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Button type="submit" size="full" isLoading={submitting}>
                {t("submitBtn")}
              </Button>
              <button
                type="button"
                className="text-brand-500 text-sm hover:text-brand-700 transition-colors flex items-center gap-1 justify-center"
                onClick={() => setStep(1)}
              >
                <ArrowLeft className="h-3.5 w-3.5" /> {t("backBtn")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

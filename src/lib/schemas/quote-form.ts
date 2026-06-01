import { z } from "zod";

export const QuoteFormStep1Schema = z.object({
  productType: z.enum(["motor-oils", "mineral-oils", "industrial-lubricants", "gear-oils", "other"]),
  productSpec: z.string().min(2, "Please describe the product or specification.").max(500),
  quantity: z.number({ message: "Enter a valid number." }).positive().max(1_000_000),
  unit: z.enum(["liters", "metric-tons", "drums", "ibcs"]),
  packaging: z.array(z.enum(["drum-205l", "ibc-1000l", "pail-20l", "bulk-tanker", "flexible"])).optional(),
  destinationCountry: z.string().min(2, "Please select a destination country."),
  targetDelivery: z.string().optional(),
});

export const QuoteFormStep2Schema = z.object({
  fullName: z.string().min(2, "Full name is required.").max(100),
  jobTitle: z.string().min(2, "Job title is required.").max(100),
  companyName: z.string().min(2, "Company name is required.").max(200),
  email: z
    .string()
    .email("Enter a valid email address.")
    .refine(
      (email) => !["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com"].some((d) => email.endsWith(`@${d}`)),
      { message: "Please use a business email address." }
    ),
  phone: z.string().regex(/^\+?[\d\s\-().]{7,20}$/, "Enter a valid phone number with country code."),
  howFound: z.enum(["google", "linkedin", "trade-show", "referral", "directory", "other"]).optional(),
  notes: z.string().max(2000).optional(),
  acceptedTerms: z.literal(true, { error: "You must accept the privacy policy." }),
});

export const QuoteFormSchema = QuoteFormStep1Schema.merge(QuoteFormStep2Schema);

export type QuoteFormStep1Data = z.infer<typeof QuoteFormStep1Schema>;
export type QuoteFormStep2Data = z.infer<typeof QuoteFormStep2Schema>;
export type QuoteFormData = z.infer<typeof QuoteFormSchema>;

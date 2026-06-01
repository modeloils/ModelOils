import { NextRequest, NextResponse } from "next/server";
import { QuoteFormSchema } from "@/lib/schemas/quote-form";
import { generateQuoteReference } from "@/lib/utils/formatting";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as unknown;

    // Server-side Zod validation
    const parsed = QuoteFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const data = parsed.data;
    const reference = generateQuoteReference();

    // Send notification email to sales team (configure RESEND_API_KEY in env)
    const resendApiKey = process.env["RESEND_API_KEY"];
    if (resendApiKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: "Model Oils CRM <crm@modeloils.com>",
        to: ["info@modeloils.com"],
        subject: `New Quote Request ${reference} — ${data.productSpec}`,
        text: [
          `Reference: ${reference}`,
          `Product Type: ${data.productType}`,
          `Specification: ${data.productSpec}`,
          `Quantity: ${data.quantity} ${data.unit}`,
          `Destination: ${data.destinationCountry}`,
          `Delivery Target: ${data.targetDelivery ?? "Not specified"}`,
          `---`,
          `Contact: ${data.fullName} (${data.jobTitle})`,
          `Company: ${data.companyName}`,
          `Email: ${data.email}`,
          `Phone/WA: ${data.phone}`,
          `Notes: ${data.notes ?? "—"}`,
          `How found: ${data.howFound ?? "—"}`,
        ].join("\n"),
      });

      // Auto-responder to buyer
      await resend.emails.send({
        from: "Model Oils Export Team <info@modeloils.com>",
        to: [data.email],
        subject: `Your Quote Request ${reference} — Model Oils Export Team`,
        text: [
          `Dear ${data.fullName},`,
          ``,
          `Thank you for your inquiry. Your quote request has been received and assigned reference number ${reference}.`,
          ``,
          `Our export team will review your requirements for "${data.productSpec}" and send you a detailed quotation within 24 business hours.`,
          ``,
          `For immediate assistance, you can reach us on WhatsApp: +90 533 456 7975`,
          ``,
          `Best regards,`,
          `Model Oils Export Team`,
        ].join("\n"),
      });
    }

    return NextResponse.json(
      { success: true, reference },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

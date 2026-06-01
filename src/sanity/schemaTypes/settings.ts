import { defineField, defineType } from "sanity";

export const settingsSchema = defineType({
  name: "settings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "companyName", title: "Company Name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "phone", title: "Phone (international format)", type: "string" }),
    defineField({ name: "whatsapp", title: "WhatsApp Number (international format)", type: "string" }),
    defineField({ name: "email", title: "Contact Email", type: "string" }),
    defineField({ name: "address", title: "Full Address", type: "text" }),
    defineField({ name: "countriesCount", title: "Countries Exported To", type: "number" }),
    defineField({ name: "tonnesPerYear", title: "Metric Tons Per Year", type: "string" }),
    defineField({ name: "yearsInOperation", title: "Years in Operation", type: "number" }),
    defineField({ name: "b2bClients", title: "B2B Clients Count", type: "number" }),
    defineField({ name: "deliveryRate", title: "On-Time Delivery Rate (%)", type: "string" }),
    defineField({ name: "logo", title: "Company Logo", type: "image" }),
    defineField({ name: "logoWhite", title: "Logo (White Version)", type: "image" }),
  ],
  preview: { select: { title: "companyName" } },
});

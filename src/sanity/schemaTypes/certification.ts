import { defineField, defineType } from "sanity";

export const certificationSchema = defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Full Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "abbreviation", title: "Abbreviation (e.g. ISO 9001)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "certificateFile", title: "Certificate PDF", type: "file", options: { accept: ".pdf" } }),
    defineField({ name: "issuingBody", title: "Issuing Body", type: "string" }),
    defineField({ name: "certificateNumber", title: "Certificate Number", type: "string" }),
    defineField({ name: "validUntil", title: "Valid Until", type: "date" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: { select: { title: "abbreviation", subtitle: "issuingBody" } },
});

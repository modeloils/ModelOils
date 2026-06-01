import { defineField, defineType } from "sanity";

export const faqItemSchema = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Answer", type: "array", of: [{ type: "block" }], validation: (r) => r.required() }),
    defineField({ name: "productRef", title: "Product (leave empty for global FAQ)", type: "reference", to: [{ type: "product" }] }),
  ],
  preview: { select: { title: "question" } },
});

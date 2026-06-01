import { defineField, defineType } from "sanity";

export const industrySchema = defineType({
  name: "industry",
  title: "Industry",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Industry Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "icon", title: "Icon Name (Lucide)", type: "string" }),
    defineField({ name: "description", title: "Short Description", type: "text", rows: 2 }),
    defineField({ name: "featuredProducts", title: "Featured Products", type: "array", of: [{ type: "reference", to: [{ type: "product" }] }] }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "description" } },
});

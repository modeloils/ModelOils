import { productSchema } from "./product";
import { productCategorySchema } from "./productCategory";
import { blogPostSchema } from "./blogPost";
import { certificationSchema } from "./certification";
import { industrySchema } from "./industry";
import { faqItemSchema } from "./faqItem";
import { settingsSchema } from "./settings";

export const schemaTypes = [
  productSchema,
  productCategorySchema,
  blogPostSchema,
  certificationSchema,
  industrySchema,
  faqItemSchema,
  settingsSchema,
];

import { createFileRoute } from "@tanstack/react-router";
import { BlogArticle } from "../blog_.$slug";
import { blogArticleHead, requireBlogArticle } from "@/lib/seo";
export const Route = createFileRoute("/ar/blog_/$slug")({
  loader: ({ params }) => requireBlogArticle("ar", params.slug),
  head: ({ params }) => blogArticleHead("ar", params.slug),
  component: BlogArticle,
});

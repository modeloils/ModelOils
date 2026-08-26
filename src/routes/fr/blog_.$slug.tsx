import { createFileRoute } from "@tanstack/react-router";
import { BlogArticle } from "../blog_.$slug";
import { blogArticleHead, requireBlogArticle } from "@/lib/seo";
export const Route = createFileRoute("/fr/blog_/$slug")({
  loader: ({ params }) => requireBlogArticle("fr", params.slug),
  head: ({ params }) => blogArticleHead("fr", params.slug),
  component: BlogArticle,
});

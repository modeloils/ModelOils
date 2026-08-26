import { createFileRoute } from "@tanstack/react-router";
import { BlogArticle } from "../blog_.$slug";
import { blogArticleHead, requireBlogArticle } from "@/lib/seo";
export const Route = createFileRoute("/de/blog_/$slug")({
  loader: ({ params }) => requireBlogArticle("de", params.slug),
  head: ({ params }) => blogArticleHead("de", params.slug),
  component: BlogArticle,
});

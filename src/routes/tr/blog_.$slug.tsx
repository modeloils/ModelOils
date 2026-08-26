import { createFileRoute } from "@tanstack/react-router";
import { BlogArticle } from "../blog_.$slug";
import { blogArticleHead, requireBlogArticle } from "@/lib/seo";
export const Route = createFileRoute("/tr/blog_/$slug")({
  loader: ({ params }) => requireBlogArticle("tr", params.slug),
  head: ({ params }) => blogArticleHead("tr", params.slug),
  component: BlogArticle,
});

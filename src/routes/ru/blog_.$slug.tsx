import { createFileRoute } from "@tanstack/react-router";
import { BlogArticle } from "../blog_.$slug";
import { blogArticleHead, requireBlogArticle } from "@/lib/seo";
export const Route = createFileRoute("/ru/blog_/$slug")({
  loader: ({ params }) => requireBlogArticle("ru", params.slug),
  head: ({ params }) => blogArticleHead("ru", params.slug),
  component: BlogArticle,
});

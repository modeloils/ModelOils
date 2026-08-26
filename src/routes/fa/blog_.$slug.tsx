import { createFileRoute } from "@tanstack/react-router";
import { BlogArticle } from "../blog_.$slug";
import { blogArticleHead, requireBlogArticle } from "@/lib/seo";
export const Route = createFileRoute("/fa/blog_/$slug")({
  loader: ({ params }) => requireBlogArticle("fa", params.slug),
  head: ({ params }) => blogArticleHead("fa", params.slug),
  component: BlogArticle,
});

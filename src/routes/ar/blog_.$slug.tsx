import { createFileRoute } from "@tanstack/react-router";
import { BlogArticle, blogArticleHead } from "../blog_.$slug";
export const Route = createFileRoute("/ar/blog_/$slug")({
  head: () => blogArticleHead("ar"),
  component: BlogArticle,
});

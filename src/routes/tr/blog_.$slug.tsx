import { createFileRoute } from "@tanstack/react-router";
import { BlogArticle, blogArticleHead } from "../blog_.$slug";
export const Route = createFileRoute("/tr/blog_/$slug")({
  head: () => blogArticleHead("tr"),
  component: BlogArticle,
});

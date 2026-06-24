import { createFileRoute } from "@tanstack/react-router";
import { BlogArticle, blogArticleHead } from "../blog_.$slug";
export const Route = createFileRoute("/fr/blog_/$slug")({
  head: () => blogArticleHead("fr"),
  component: BlogArticle,
});

import { createFileRoute } from "@tanstack/react-router";
import { BlogArticle, blogArticleHead } from "../blog_.$slug";
export const Route = createFileRoute("/de/blog_/$slug")({
  head: () => blogArticleHead("de"),
  component: BlogArticle,
});

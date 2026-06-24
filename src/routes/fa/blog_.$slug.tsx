import { createFileRoute } from "@tanstack/react-router";
import { BlogArticle, blogArticleHead } from "../blog_.$slug";
export const Route = createFileRoute("/fa/blog_/$slug")({
  head: () => blogArticleHead("fa"),
  component: BlogArticle,
});

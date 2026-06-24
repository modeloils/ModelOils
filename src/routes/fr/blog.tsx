import { createFileRoute } from "@tanstack/react-router";
import { Blog, blogHead } from "../blog";
export const Route = createFileRoute("/fr/blog")({
  head: () => blogHead("fr"),
  component: Blog,
});

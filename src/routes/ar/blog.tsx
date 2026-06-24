import { createFileRoute } from "@tanstack/react-router";
import { Blog, blogHead } from "../blog";
export const Route = createFileRoute("/ar/blog")({
  head: () => blogHead("ar"),
  component: Blog,
});

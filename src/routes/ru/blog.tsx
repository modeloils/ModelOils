import { createFileRoute } from "@tanstack/react-router";
import { Blog, blogHead } from "../blog";
export const Route = createFileRoute("/ru/blog")({
  head: () => blogHead("ru"),
  component: Blog,
});

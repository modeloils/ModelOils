import { createFileRoute } from "@tanstack/react-router";
import { Blog, blogHead } from "../blog";
export const Route = createFileRoute("/tr/blog")({
  head: () => blogHead("tr"),
  component: Blog,
});

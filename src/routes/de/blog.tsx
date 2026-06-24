import { createFileRoute } from "@tanstack/react-router";
import { Blog, blogHead } from "../blog";
export const Route = createFileRoute("/de/blog")({
  head: () => blogHead("de"),
  component: Blog,
});

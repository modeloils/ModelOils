import { createFileRoute } from "@tanstack/react-router";
import { Blog, blogHead } from "../blog";
export const Route = createFileRoute("/fa/blog")({
  head: () => blogHead("fa"),
  component: Blog,
});

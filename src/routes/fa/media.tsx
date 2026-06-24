import { createFileRoute } from "@tanstack/react-router";
import { Media, mediaHead } from "../media";

export const Route = createFileRoute("/fa/media")({
  head: () => mediaHead("fa"),
  component: Media,
});

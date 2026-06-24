import { createFileRoute } from "@tanstack/react-router";
import { Media, mediaHead } from "../media";

export const Route = createFileRoute("/ar/media")({
  head: () => mediaHead("ar"),
  component: Media,
});

import { createFileRoute } from "@tanstack/react-router";
import { Media, mediaHead } from "../media";

export const Route = createFileRoute("/de/media")({
  head: () => mediaHead("de"),
  component: Media,
});

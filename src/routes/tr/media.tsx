import { createFileRoute } from "@tanstack/react-router";
import { Media, mediaHead } from "../media";

export const Route = createFileRoute("/tr/media")({
  head: () => mediaHead("tr"),
  component: Media,
});

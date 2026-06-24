import { createFileRoute } from "@tanstack/react-router";
import { Media, mediaHead } from "../media";

export const Route = createFileRoute("/fr/media")({
  head: () => mediaHead("fr"),
  component: Media,
});

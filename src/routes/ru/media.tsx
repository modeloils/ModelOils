import { createFileRoute } from "@tanstack/react-router";
import { Media, mediaHead } from "../media";

export const Route = createFileRoute("/ru/media")({
  head: () => mediaHead("ru"),
  component: Media,
});

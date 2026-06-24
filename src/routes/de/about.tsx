import { createFileRoute } from "@tanstack/react-router";
import { About, aboutHead } from "../about";

export const Route = createFileRoute("/de/about")({
  head: () => aboutHead("de"),
  component: About,
});

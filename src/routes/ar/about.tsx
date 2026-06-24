import { createFileRoute } from "@tanstack/react-router";
import { About, aboutHead } from "../about";

export const Route = createFileRoute("/ar/about")({
  head: () => aboutHead("ar"),
  component: About,
});

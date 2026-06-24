import { createFileRoute } from "@tanstack/react-router";
import { About, aboutHead } from "../about";

export const Route = createFileRoute("/fr/about")({
  head: () => aboutHead("fr"),
  component: About,
});

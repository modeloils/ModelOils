import { createFileRoute } from "@tanstack/react-router";
import { About, aboutHead } from "../about";

export const Route = createFileRoute("/tr/about")({
  head: () => aboutHead("tr"),
  component: About,
});

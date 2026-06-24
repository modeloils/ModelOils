import { createFileRoute } from "@tanstack/react-router";
import { About, aboutHead } from "../about";

export const Route = createFileRoute("/ru/about")({
  head: () => aboutHead("ru"),
  component: About,
});

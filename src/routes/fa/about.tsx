import { createFileRoute } from "@tanstack/react-router";
import { About, aboutHead } from "../about";

export const Route = createFileRoute("/fa/about")({
  head: () => aboutHead("fa"),
  component: About,
});

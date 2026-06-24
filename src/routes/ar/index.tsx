import { createFileRoute } from "@tanstack/react-router";
import { Home, homeHead } from "../index";

export const Route = createFileRoute("/ar/")({
  head: () => homeHead("ar"),
  component: Home,
});

import { createFileRoute } from "@tanstack/react-router";
import { Home, homeHead } from "../index";

export const Route = createFileRoute("/fr/")({
  head: () => homeHead("fr"),
  component: Home,
});

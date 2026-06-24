import { createFileRoute } from "@tanstack/react-router";
import { Home, homeHead } from "../index";

export const Route = createFileRoute("/de/")({
  head: () => homeHead("de"),
  component: Home,
});

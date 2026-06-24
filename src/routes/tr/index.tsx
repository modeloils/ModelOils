import { createFileRoute } from "@tanstack/react-router";
import { Home, homeHead } from "../index";

export const Route = createFileRoute("/tr/")({
  head: () => homeHead("tr"),
  component: Home,
});

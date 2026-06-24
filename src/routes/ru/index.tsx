import { createFileRoute } from "@tanstack/react-router";
import { Home, homeHead } from "../index";

export const Route = createFileRoute("/ru/")({
  head: () => homeHead("ru"),
  component: Home,
});

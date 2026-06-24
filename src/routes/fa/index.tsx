import { createFileRoute } from "@tanstack/react-router";
import { Home, homeHead } from "../index";

export const Route = createFileRoute("/fa/")({
  head: () => homeHead("fa"),
  component: Home,
});

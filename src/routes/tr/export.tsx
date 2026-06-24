import { createFileRoute } from "@tanstack/react-router";
import { Export, exportHead } from "../export";

export const Route = createFileRoute("/tr/export")({
  head: () => exportHead("tr"),
  component: Export,
});

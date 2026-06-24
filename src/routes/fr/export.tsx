import { createFileRoute } from "@tanstack/react-router";
import { Export, exportHead } from "../export";

export const Route = createFileRoute("/fr/export")({
  head: () => exportHead("fr"),
  component: Export,
});

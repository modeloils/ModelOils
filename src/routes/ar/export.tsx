import { createFileRoute } from "@tanstack/react-router";
import { Export, exportHead } from "../export";

export const Route = createFileRoute("/ar/export")({
  head: () => exportHead("ar"),
  component: Export,
});

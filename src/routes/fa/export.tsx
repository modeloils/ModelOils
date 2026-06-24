import { createFileRoute } from "@tanstack/react-router";
import { Export, exportHead } from "../export";

export const Route = createFileRoute("/fa/export")({
  head: () => exportHead("fa"),
  component: Export,
});

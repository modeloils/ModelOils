import { createFileRoute } from "@tanstack/react-router";
import { Export, exportHead } from "../export";

export const Route = createFileRoute("/ru/export")({
  head: () => exportHead("ru"),
  component: Export,
});

import { createFileRoute } from "@tanstack/react-router";
import { Export, exportHead } from "../export";

export const Route = createFileRoute("/de/export")({
  head: () => exportHead("de"),
  component: Export,
});

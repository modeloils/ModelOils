import { createFileRoute } from "@tanstack/react-router";
import { Catalogs, catalogsHead } from "../catalogs";

export const Route = createFileRoute("/de/catalogs")({
  head: () => catalogsHead("de"),
  component: Catalogs,
});

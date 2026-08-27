import { createFileRoute } from "@tanstack/react-router";
import { Catalogs, catalogsHead } from "../catalogs";

export const Route = createFileRoute("/fr/catalogs")({
  head: () => catalogsHead("fr"),
  component: Catalogs,
});

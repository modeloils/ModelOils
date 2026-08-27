import { createFileRoute } from "@tanstack/react-router";
import { Catalogs, catalogsHead } from "../catalogs";

export const Route = createFileRoute("/ar/catalogs")({
  head: () => catalogsHead("ar"),
  component: Catalogs,
});

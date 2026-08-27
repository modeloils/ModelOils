import { createFileRoute } from "@tanstack/react-router";
import { Catalogs, catalogsHead } from "../catalogs";

export const Route = createFileRoute("/tr/catalogs")({
  head: () => catalogsHead("tr"),
  component: Catalogs,
});

import { createFileRoute } from "@tanstack/react-router";
import { Catalogs, catalogsHead } from "../catalogs";

export const Route = createFileRoute("/fa/catalogs")({
  head: () => catalogsHead("fa"),
  component: Catalogs,
});

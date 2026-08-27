import { createFileRoute } from "@tanstack/react-router";
import { Catalogs, catalogsHead } from "../catalogs";

export const Route = createFileRoute("/ru/catalogs")({
  head: () => catalogsHead("ru"),
  component: Catalogs,
});

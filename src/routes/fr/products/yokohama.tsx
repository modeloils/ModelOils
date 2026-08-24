import { createFileRoute } from "@tanstack/react-router";
import { Yokohama, yokohamaHead } from "../../products/yokohama";

export const Route = createFileRoute("/fr/products/yokohama")({
  head: () => yokohamaHead("fr"),
  component: Yokohama,
});

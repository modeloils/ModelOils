import { createFileRoute } from "@tanstack/react-router";
import { Yokohama, yokohamaHead } from "../../products/yokohama";

export const Route = createFileRoute("/ar/products/yokohama")({
  head: () => yokohamaHead("ar"),
  component: Yokohama,
});

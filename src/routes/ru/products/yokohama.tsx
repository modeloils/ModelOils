import { createFileRoute } from "@tanstack/react-router";
import { Yokohama, yokohamaHead } from "../../products/yokohama";

export const Route = createFileRoute("/ru/products/yokohama")({
  head: () => yokohamaHead("ru"),
  component: Yokohama,
});

import { createFileRoute } from "@tanstack/react-router";
import { Yokohama, yokohamaHead } from "../../products/yokohama";

export const Route = createFileRoute("/tr/products/yokohama")({
  head: () => yokohamaHead("tr"),
  component: Yokohama,
});

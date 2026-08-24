import { createFileRoute } from "@tanstack/react-router";
import { Yokohama, yokohamaHead } from "../../products/yokohama";

export const Route = createFileRoute("/fa/products/yokohama")({
  head: () => yokohamaHead("fa"),
  component: Yokohama,
});

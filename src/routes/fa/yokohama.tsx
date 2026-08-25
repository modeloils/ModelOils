import { createFileRoute } from "@tanstack/react-router";
import { Yokohama, yokohamaHead } from "../yokohama";

export const Route = createFileRoute("/fa/yokohama")({
  head: () => yokohamaHead("fa"),
  component: Yokohama,
});

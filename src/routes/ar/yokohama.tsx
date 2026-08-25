import { createFileRoute } from "@tanstack/react-router";
import { Yokohama, yokohamaHead } from "../yokohama";

export const Route = createFileRoute("/ar/yokohama")({
  head: () => yokohamaHead("ar"),
  component: Yokohama,
});

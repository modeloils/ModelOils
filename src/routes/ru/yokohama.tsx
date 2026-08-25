import { createFileRoute } from "@tanstack/react-router";
import { Yokohama, yokohamaHead } from "../yokohama";

export const Route = createFileRoute("/ru/yokohama")({
  head: () => yokohamaHead("ru"),
  component: Yokohama,
});

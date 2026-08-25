import { createFileRoute } from "@tanstack/react-router";
import { Yokohama, yokohamaHead } from "../yokohama";

export const Route = createFileRoute("/fr/yokohama")({
  head: () => yokohamaHead("fr"),
  component: Yokohama,
});

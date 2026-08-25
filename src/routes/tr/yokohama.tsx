import { createFileRoute } from "@tanstack/react-router";
import { Yokohama, yokohamaHead } from "../yokohama";

export const Route = createFileRoute("/tr/yokohama")({
  head: () => yokohamaHead("tr"),
  component: Yokohama,
});

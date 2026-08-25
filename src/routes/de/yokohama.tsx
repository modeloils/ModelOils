import { createFileRoute } from "@tanstack/react-router";
import { Yokohama, yokohamaHead } from "../yokohama";

export const Route = createFileRoute("/de/yokohama")({
  head: () => yokohamaHead("de"),
  component: Yokohama,
});

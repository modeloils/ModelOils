import { createFileRoute } from "@tanstack/react-router";
import { Yokohama, yokohamaHead } from "../../products/yokohama";

export const Route = createFileRoute("/de/products/yokohama")({
  head: () => yokohamaHead("de"),
  component: Yokohama,
});

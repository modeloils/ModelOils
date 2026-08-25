import { createFileRoute } from "@tanstack/react-router";
import { HiTechSubcategory } from "../hi-tech";
import { yokohamaHead } from "../yokohama";

export const Route = createFileRoute("/fa/yokohama_/$category")({
  head: () => yokohamaHead("fa"),
  component: HiTechSubcategory,
});

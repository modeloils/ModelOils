import { createFileRoute } from "@tanstack/react-router";
import { HiTech, hiTechHead } from "../../products/hi-tech";

export const Route = createFileRoute("/fr/products/hi-tech")({
  head: () => hiTechHead("fr"),
  component: HiTech,
});

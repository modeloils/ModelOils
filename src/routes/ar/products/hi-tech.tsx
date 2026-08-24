import { createFileRoute } from "@tanstack/react-router";
import { HiTech, hiTechHead } from "../../products/hi-tech";

export const Route = createFileRoute("/ar/products/hi-tech")({
  head: () => hiTechHead("ar"),
  component: HiTech,
});

import { createFileRoute } from "@tanstack/react-router";
import { HiTech, hiTechHead } from "../../products/hi-tech";

export const Route = createFileRoute("/ru/products/hi-tech")({
  head: () => hiTechHead("ru"),
  component: HiTech,
});

import { createFileRoute } from "@tanstack/react-router";
import { HiTech, hiTechHead } from "../../products/hi-tech";

export const Route = createFileRoute("/de/products/hi-tech")({
  head: () => hiTechHead("de"),
  component: HiTech,
});

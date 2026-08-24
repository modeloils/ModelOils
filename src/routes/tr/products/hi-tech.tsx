import { createFileRoute } from "@tanstack/react-router";
import { HiTech, hiTechHead } from "../../products/hi-tech";

export const Route = createFileRoute("/tr/products/hi-tech")({
  head: () => hiTechHead("tr"),
  component: HiTech,
});

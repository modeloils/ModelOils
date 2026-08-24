import { createFileRoute } from "@tanstack/react-router";
import { HiTech, hiTechHead } from "../../products/hi-tech";

export const Route = createFileRoute("/fa/products/hi-tech")({
  head: () => hiTechHead("fa"),
  component: HiTech,
});

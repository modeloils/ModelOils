import { createFileRoute } from "@tanstack/react-router";
import { HiTech, hiTechHead } from "../hi-tech";

export const Route = createFileRoute("/fa/hi-tech")({
  head: () => hiTechHead("fa"),
  component: HiTech,
});

import { createFileRoute } from "@tanstack/react-router";
import { HiTech, hiTechHead } from "../hi-tech";

export const Route = createFileRoute("/ar/hi-tech")({
  head: () => hiTechHead("ar"),
  component: HiTech,
});

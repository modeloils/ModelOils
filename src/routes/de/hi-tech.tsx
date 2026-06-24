import { createFileRoute } from "@tanstack/react-router";
import { HiTech, hiTechHead } from "../hi-tech";

export const Route = createFileRoute("/de/hi-tech")({
  head: () => hiTechHead("de"),
  component: HiTech,
});

import { createFileRoute } from "@tanstack/react-router";
import { HiTech, hiTechHead } from "../hi-tech";

export const Route = createFileRoute("/tr/HI-TECH")({
  head: () => hiTechHead("tr"),
  component: HiTech,
});

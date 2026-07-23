import { createFileRoute } from "@tanstack/react-router";
import { HiTech, hiTechHead } from "../hi-tech";

export const Route = createFileRoute("/tr/hi-tech")({
  head: () => hiTechHead("tr"),
  component: HiTech,
});

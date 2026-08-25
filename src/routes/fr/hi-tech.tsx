import { createFileRoute } from "@tanstack/react-router";
import { HiTech, hiTechHead } from "../hi-tech";

export const Route = createFileRoute("/fr/hi-tech")({
  head: () => hiTechHead("fr"),
  component: HiTech,
});

import { createFileRoute } from "@tanstack/react-router";
import { HiTech, hiTechHead } from "../hi-tech";

export const Route = createFileRoute("/ru/hi-tech")({
  head: () => hiTechHead("ru"),
  component: HiTech,
});

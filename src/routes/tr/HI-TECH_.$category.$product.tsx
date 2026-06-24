import { createFileRoute } from "@tanstack/react-router";
import { HiTechProduct } from "../hi-tech";

export const Route = createFileRoute("/tr/HI-TECH_/$category/$product")({
  component: HiTechProduct,
});

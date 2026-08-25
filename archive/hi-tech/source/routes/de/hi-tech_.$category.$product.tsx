import { createFileRoute } from "@tanstack/react-router";
import { HiTechProduct } from "../hi-tech";

export const Route = createFileRoute("/de/hi-tech_/$category/$product")({
  component: HiTechProduct,
});

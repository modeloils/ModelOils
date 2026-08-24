import { createFileRoute } from "@tanstack/react-router";
import { HiTechProduct } from "../../products/hi-tech";

export const Route = createFileRoute("/fr/products/hi-tech_/$category/$product")({
  component: HiTechProduct,
});

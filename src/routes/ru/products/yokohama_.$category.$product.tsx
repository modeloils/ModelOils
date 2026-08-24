import { createFileRoute } from "@tanstack/react-router";
import { HiTechProduct } from "../../products/hi-tech";

export const Route = createFileRoute("/ru/products/yokohama_/$category/$product")({
  component: HiTechProduct,
});

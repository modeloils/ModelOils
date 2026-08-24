import { createFileRoute } from "@tanstack/react-router";
import { HiTechProduct } from "../../products/hi-tech";

export const Route = createFileRoute("/fa/products/yokohama_/$category/$product")({
  component: HiTechProduct,
});

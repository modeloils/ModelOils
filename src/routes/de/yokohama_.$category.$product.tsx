import { createFileRoute } from "@tanstack/react-router";
import { HiTechProduct } from "../hi-tech";

export const Route = createFileRoute("/de/yokohama_/$category/$product")({
  component: HiTechProduct,
});

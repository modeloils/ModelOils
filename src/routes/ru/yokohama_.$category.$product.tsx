import { createFileRoute } from "@tanstack/react-router";
import { HiTechProduct } from "../hi-tech";

export const Route = createFileRoute("/ru/yokohama_/$category/$product")({
  component: HiTechProduct,
});

import { createFileRoute } from "@tanstack/react-router";
import { HiTechProduct } from "../hi-tech";

export const Route = createFileRoute("/fa/yokohama_/$category/$product")({
  component: HiTechProduct,
});

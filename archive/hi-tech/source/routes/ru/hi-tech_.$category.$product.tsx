import { createFileRoute } from "@tanstack/react-router";
import { HiTechProduct } from "../hi-tech";

export const Route = createFileRoute("/ru/hi-tech_/$category/$product")({
  component: HiTechProduct,
});

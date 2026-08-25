import { createFileRoute } from "@tanstack/react-router";
import { YokohamaProduct } from "@/components/YokohamaRange";

export const Route = createFileRoute("/fr/yokohama_/$category/$product")({
  component: YokohamaProduct,
});

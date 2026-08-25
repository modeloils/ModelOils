import { createFileRoute } from "@tanstack/react-router";
import { YokohamaProduct } from "@/components/YokohamaRange";

export const Route = createFileRoute("/fa/yokohama_/$category/$product")({
  component: YokohamaProduct,
});

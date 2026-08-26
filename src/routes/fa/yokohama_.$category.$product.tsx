import { createFileRoute } from "@tanstack/react-router";
import { YokohamaProduct } from "@/components/YokohamaRange";
import { requireYokohamaSegment, yokohamaSegmentHead } from "@/lib/seo";

export const Route = createFileRoute("/fa/yokohama_/$category/$product")({
  loader: ({ params }) => requireYokohamaSegment(params.category, params.product),
  head: ({ params }) => yokohamaSegmentHead("fa", params.category, params.product),
  component: YokohamaProduct,
});

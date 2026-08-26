import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalPageHead } from "@/components/LegalPage";

export const Route = createFileRoute("/ar/kvkk")({
  head: () => legalPageHead("ar", "kvkk"),
  component: () => <LegalPage kind="kvkk" />,
});

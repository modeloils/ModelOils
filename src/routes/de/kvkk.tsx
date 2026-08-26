import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalPageHead } from "@/components/LegalPage";

export const Route = createFileRoute("/de/kvkk")({
  head: () => legalPageHead("de", "kvkk"),
  component: () => <LegalPage kind="kvkk" />,
});

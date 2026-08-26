import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalPageHead } from "@/components/LegalPage";

export const Route = createFileRoute("/fr/kvkk")({
  head: () => legalPageHead("fr", "kvkk"),
  component: () => <LegalPage kind="kvkk" />,
});

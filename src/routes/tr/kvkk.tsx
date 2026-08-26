import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalPageHead } from "@/components/LegalPage";

export const Route = createFileRoute("/tr/kvkk")({
  head: () => legalPageHead("tr", "kvkk"),
  component: () => <LegalPage kind="kvkk" />,
});

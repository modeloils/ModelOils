import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalPageHead } from "@/components/LegalPage";

export const Route = createFileRoute("/fa/kvkk")({
  head: () => legalPageHead("fa", "kvkk"),
  component: () => <LegalPage kind="kvkk" />,
});

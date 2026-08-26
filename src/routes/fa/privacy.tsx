import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalPageHead } from "@/components/LegalPage";

export const Route = createFileRoute("/fa/privacy")({
  head: () => legalPageHead("fa", "privacy"),
  component: () => <LegalPage kind="privacy" />,
});

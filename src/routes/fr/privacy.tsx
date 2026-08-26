import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalPageHead } from "@/components/LegalPage";

export const Route = createFileRoute("/fr/privacy")({
  head: () => legalPageHead("fr", "privacy"),
  component: () => <LegalPage kind="privacy" />,
});

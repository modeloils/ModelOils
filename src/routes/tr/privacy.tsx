import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalPageHead } from "@/components/LegalPage";

export const Route = createFileRoute("/tr/privacy")({
  head: () => legalPageHead("tr", "privacy"),
  component: () => <LegalPage kind="privacy" />,
});

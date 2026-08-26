import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalPageHead } from "@/components/LegalPage";

export const Route = createFileRoute("/de/privacy")({
  head: () => legalPageHead("de", "privacy"),
  component: () => <LegalPage kind="privacy" />,
});

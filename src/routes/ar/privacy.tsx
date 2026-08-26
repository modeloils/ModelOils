import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalPageHead } from "@/components/LegalPage";

export const Route = createFileRoute("/ar/privacy")({
  head: () => legalPageHead("ar", "privacy"),
  component: () => <LegalPage kind="privacy" />,
});

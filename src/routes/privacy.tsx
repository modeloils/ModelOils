import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalPageHead } from "@/components/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => legalPageHead("en", "privacy"),
  component: () => <LegalPage kind="privacy" />,
});

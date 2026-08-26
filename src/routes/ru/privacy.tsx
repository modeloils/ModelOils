import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalPageHead } from "@/components/LegalPage";

export const Route = createFileRoute("/ru/privacy")({
  head: () => legalPageHead("ru", "privacy"),
  component: () => <LegalPage kind="privacy" />,
});

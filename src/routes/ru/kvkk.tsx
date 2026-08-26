import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalPageHead } from "@/components/LegalPage";

export const Route = createFileRoute("/ru/kvkk")({
  head: () => legalPageHead("ru", "kvkk"),
  component: () => <LegalPage kind="kvkk" />,
});

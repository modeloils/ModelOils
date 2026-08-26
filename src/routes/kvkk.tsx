import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalPageHead } from "@/components/LegalPage";

export const Route = createFileRoute("/kvkk")({
  head: () => legalPageHead("en", "kvkk"),
  component: () => <LegalPage kind="kvkk" />,
});

import { createFileRoute } from "@tanstack/react-router";
import { Industries, industriesHead } from "../industries";

export const Route = createFileRoute("/fr/industries")({
  head: () => industriesHead("fr"),
  component: Industries,
});

import { createFileRoute } from "@tanstack/react-router";
import { Industries, industriesHead } from "../industries";

export const Route = createFileRoute("/fa/industries")({
  head: () => industriesHead("fa"),
  component: Industries,
});

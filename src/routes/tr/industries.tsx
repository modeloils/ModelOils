import { createFileRoute } from "@tanstack/react-router";
import { Industries, industriesHead } from "../industries";

export const Route = createFileRoute("/tr/industries")({
  head: () => industriesHead("tr"),
  component: Industries,
});

import { createFileRoute } from "@tanstack/react-router";
import { Industries, industriesHead } from "../industries";

export const Route = createFileRoute("/ar/industries")({
  head: () => industriesHead("ar"),
  component: Industries,
});

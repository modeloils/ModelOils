import { createFileRoute } from "@tanstack/react-router";
import { Industries, industriesHead } from "../industries";

export const Route = createFileRoute("/de/industries")({
  head: () => industriesHead("de"),
  component: Industries,
});

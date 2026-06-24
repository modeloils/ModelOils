import { createFileRoute } from "@tanstack/react-router";
import { Industries, industriesHead } from "../industries";

export const Route = createFileRoute("/ru/industries")({
  head: () => industriesHead("ru"),
  component: Industries,
});

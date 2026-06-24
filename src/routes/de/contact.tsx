import { createFileRoute } from "@tanstack/react-router";
import { Contact, contactHead } from "../contact";

export const Route = createFileRoute("/de/contact")({
  head: () => contactHead("de"),
  component: Contact,
});

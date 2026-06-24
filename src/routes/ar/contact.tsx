import { createFileRoute } from "@tanstack/react-router";
import { Contact, contactHead } from "../contact";

export const Route = createFileRoute("/ar/contact")({
  head: () => contactHead("ar"),
  component: Contact,
});

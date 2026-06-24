import { createFileRoute } from "@tanstack/react-router";
import { Contact, contactHead } from "../contact";

export const Route = createFileRoute("/fr/contact")({
  head: () => contactHead("fr"),
  component: Contact,
});

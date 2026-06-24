import { createFileRoute } from "@tanstack/react-router";
import { Contact, contactHead } from "../contact";

export const Route = createFileRoute("/tr/contact")({
  head: () => contactHead("tr"),
  component: Contact,
});

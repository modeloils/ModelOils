import { createFileRoute } from "@tanstack/react-router";
import { Contact, contactHead } from "../contact";

export const Route = createFileRoute("/fa/contact")({
  head: () => contactHead("fa"),
  component: Contact,
});

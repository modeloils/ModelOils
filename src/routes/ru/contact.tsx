import { createFileRoute } from "@tanstack/react-router";
import { Contact, contactHead } from "../contact";

export const Route = createFileRoute("/ru/contact")({
  head: () => contactHead("ru"),
  component: Contact,
});

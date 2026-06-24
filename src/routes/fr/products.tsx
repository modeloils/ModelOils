import { createFileRoute } from "@tanstack/react-router";
import { Products, productsHead } from "../products";

export const Route = createFileRoute("/fr/products")({
  head: () => productsHead("fr"),
  component: Products,
});

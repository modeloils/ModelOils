import { createFileRoute } from "@tanstack/react-router";
import { Products, productsHead } from "../products";

export const Route = createFileRoute("/tr/products")({
  head: () => productsHead("tr"),
  component: Products,
});

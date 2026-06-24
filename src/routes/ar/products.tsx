import { createFileRoute } from "@tanstack/react-router";
import { Products, productsHead } from "../products";

export const Route = createFileRoute("/ar/products")({
  head: () => productsHead("ar"),
  component: Products,
});

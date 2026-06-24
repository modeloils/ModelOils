import { createFileRoute } from "@tanstack/react-router";
import { Products, productsHead } from "../products";

export const Route = createFileRoute("/de/products")({
  head: () => productsHead("de"),
  component: Products,
});

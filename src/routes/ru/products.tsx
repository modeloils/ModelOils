import { createFileRoute } from "@tanstack/react-router";
import { Products, productsHead } from "../products";

export const Route = createFileRoute("/ru/products")({
  head: () => productsHead("ru"),
  component: Products,
});

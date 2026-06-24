import { createFileRoute } from "@tanstack/react-router";
import { Products, productsHead } from "../products";

export const Route = createFileRoute("/fa/products")({
  head: () => productsHead("fa"),
  component: Products,
});

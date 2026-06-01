// The middleware rewrites all root requests to /[locale]/ before reaching here.
// This file should never be rendered in production.
import { notFound } from "next/navigation";
export default function RootPage() {
  return notFound();
}

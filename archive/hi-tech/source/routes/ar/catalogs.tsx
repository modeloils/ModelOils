import { createFileRoute } from "@tanstack/react-router";
import { Catalogs } from "../catalogs";

export const Route = createFileRoute("/ar/catalogs")({ component: Catalogs });

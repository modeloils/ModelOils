import { createFileRoute } from "@tanstack/react-router";
import { Catalogs } from "../catalogs";

export const Route = createFileRoute("/fr/catalogs")({ component: Catalogs });

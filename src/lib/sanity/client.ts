import { createClient } from "next-sanity";

const token = process.env["SANITY_API_TOKEN"];

export const sanityClient = createClient({
  projectId: process.env["NEXT_PUBLIC_SANITY_PROJECT_ID"] ?? "your-project-id",
  dataset: process.env["NEXT_PUBLIC_SANITY_DATASET"] ?? "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  ...(token !== undefined ? { token } : {}),
});

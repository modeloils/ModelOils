import { readFile, writeFile } from "node:fs/promises";

const routesPath = new URL("../dist/_routes.json", import.meta.url);
const routes = JSON.parse(await readFile(routesPath, "utf8"));
const retainedExcludes = routes.exclude.filter(
  (route) => !route.startsWith("/assets/") && !route.startsWith("/model-oils/"),
);

routes.exclude = [...new Set([...retainedExcludes, "/assets/*", "/model-oils/*"])];

await writeFile(routesPath, `${JSON.stringify(routes, null, 2)}\n`, "utf8");

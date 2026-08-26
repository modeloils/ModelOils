import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

const LOCALE_PATH = /^\/(tr|ru|fa|ar|de|fr)(?=\/|$)/;

function redirectTarget(requestUrl: URL): string | undefined {
  if (requestUrl.hostname === "www.modeloils.com") {
    requestUrl.hostname = "modeloils.com";
    return requestUrl.toString();
  }

  const localeMatch = requestUrl.pathname.match(LOCALE_PATH);
  const localePrefix = localeMatch ? `/${localeMatch[1]}` : "";
  const path = localePrefix
    ? requestUrl.pathname.slice(localePrefix.length) || "/"
    : requestUrl.pathname;

  let targetPath: string | undefined;
  if (path === "/products" || path === "/products/yokohamabasically") {
    targetPath = "/yokohama";
  } else if (path === "/products/yokohama") {
    targetPath = "/yokohama";
  } else if (path.startsWith("/products/yokohama/")) {
    targetPath = `/yokohama/${path.slice("/products/yokohama/".length)}`;
  } else if (path === "/catalogs") {
    targetPath = "/yokohama";
  } else if (path === "/media") {
    targetPath = "/blog";
  }

  if (!targetPath) return undefined;
  requestUrl.pathname = `${localePrefix}${targetPath}`;
  return requestUrl.toString();
}

function withSecurityHeaders(response: Response, requestUrl: URL): Response {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  if (requestUrl.protocol === "https:") {
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const requestUrl = new URL(request.url);
    const target = redirectTarget(new URL(requestUrl));
    if (target) {
      return withSecurityHeaders(Response.redirect(target, 301), requestUrl);
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return withSecurityHeaders(await normalizeCatastrophicSsrResponse(response), requestUrl);
    } catch (error) {
      console.error(error);
      return withSecurityHeaders(
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
        requestUrl,
      );
    }
  },
};

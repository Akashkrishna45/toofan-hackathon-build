import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("GitHub Pages fallback", () => {
  it("redirects a GitHub Pages 404 to the Hackfinity project root", () => {
    const fallback = readFileSync(resolve(process.cwd(), "client/public/404.html"), "utf8");

    expect(fallback).toContain('window.location.pathname.split("/").filter(Boolean)');
    expect(fallback).toContain('var appBase = pathSegments.length ? "/" + pathSegments[0] + "/" : "/";');
    expect(fallback).not.toContain("toofan-hackathon-build");
  });

  it("mounts the client router at Vite's repository base path", () => {
    const app = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf8");

    expect(app).toContain('Router as WouterRouter');
    expect(app).toContain('const routerBase = import.meta.env.BASE_URL.replace(/\\/$/, "") || "/";');
    expect(app).toContain('<WouterRouter base={routerBase}>');
  });

  it("reloads the GitHub Pages base if a stale client bundle reaches the internal 404 route", () => {
    const notFound = readFileSync(resolve(process.cwd(), "client/src/pages/NotFound.tsx"), "utf8");

    expect(notFound).toContain('window.location.hostname.endsWith(".github.io")');
    expect(notFound).toContain("window.location.replace(import.meta.env.BASE_URL)");
  });
});

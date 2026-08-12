import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("GitHub Pages fallback", () => {
  it("redirects a GitHub Pages 404 to the Hackfinity project root", () => {
    const fallback = readFileSync(resolve(process.cwd(), "client/public/404.html"), "utf8");

    expect(fallback).toContain('var appBase = "/toofan-hackathon-build/"');
    expect(fallback).toContain('url=/toofan-hackathon-build/');
  });
});

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("Google Sheets registration client", () => {
  it("uses a simple cross-site request compatible with the Apps Script web endpoint", () => {
    const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

    expect(home).toContain("const registrationEndpoint =");
    expect(home).toContain('method: "POST"');
    expect(home).toContain('mode: "no-cors"');
    expect(home).toContain('"Content-Type": "text/plain;charset=utf-8"');
    expect(home).toContain("website: honeypot");
  });
});

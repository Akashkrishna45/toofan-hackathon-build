import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("Mobile hero layout", () => {
  it("reserves top space for the field brief before the hero content begins", () => {
    const styles = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");

    expect(styles).toContain("The field brief owns the top-right phone zone");
    expect(styles).toContain(".hero-section { min-height: 840px; align-items: start; padding-top: 6.25rem; padding-bottom: 10.5rem; }");
    expect(styles).toContain(".hero-content { align-self: start; padding-top: 5.8rem; }");
  });

  it("keeps an additional content buffer on the narrowest phones", () => {
    const styles = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");

    expect(styles).toContain("@media (max-width: 380px)");
    expect(styles).toContain(".hero-content { padding-top: 6.15rem; }");
  });
});

import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../client/src/pages/Home";

describe("TOOFAN homepage", () => {
  it("renders the essential event details and primary navigation", () => {
    const page = renderToStaticMarkup(createElement(Home));

    expect(page).toContain("HACKFINITY");
    expect(page).toContain("TOOFAN THEME");
    expect(page).toContain("09 OCT 2026");
    expect(page).toContain("ST. JOHN&#x27;S SCHOOL, ANCHAL");
    expect(page).toContain("The Storm");
    expect(page).toContain("Experience");
    expect(page).toContain("Venue");
    expect(page).toContain("Register");
    expect(page).toContain("FOUR CHALLENGES");
    expect(page).toContain("Eye of the Storm");
    expect(page).toContain("Signal Shift");
    expect(page).toContain("Roots × Routes");
    expect(page).toContain("Wildcard Surge");
  });

  it("presents host and partner identity while accurately describing the pre-Sheets registration state", () => {
    const page = renderToStaticMarkup(createElement(Home));

    expect(page).toContain("OFFICIAL HOST");
    expect(page).toContain("POWERED BY");
    expect(page).toContain("HOWNWHY");
    expect(page).toContain("No details are sent until the Google Sheets connection is activated.");
  });
});

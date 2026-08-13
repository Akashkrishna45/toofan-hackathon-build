import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("Official Google Sheets registration script", () => {
  it("defines organiser-ready headers and review controls", () => {
    const script = readFileSync(resolve(process.cwd(), "docs/google-apps-script-registration.gs"), "utf8");

    expect(script).toContain('"Registration ID"');
    expect(script).toContain('"Team Member Details"');
    expect(script).toContain('"Review Status"');
    expect(script).toContain('"Organiser Notes"');
    expect(script).toContain('"New", "Under Review", "Shortlisted", "Contacted", "Complete"');
  });

  it("formats the registration tab for readable organiser review", () => {
    const script = readFileSync(resolve(process.cwd(), "docs/google-apps-script-registration.gs"), "utf8");

    expect(script).toContain("applyRegistrationSheetFormat");
    expect(script).toContain("sheet.setFrozenRows(1)");
    expect(script).toContain("sheet.setFrozenColumns(2)");
    expect(script).toContain('setNumberFormat("dd mmm yyyy, hh:mm")');
    expect(script).toContain("createFilter()");
  });
});

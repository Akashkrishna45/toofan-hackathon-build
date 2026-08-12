import { describe, expect, it } from "vitest";
import { registrationSchema } from "@shared/registration";

describe("TOOFAN registration validation", () => {
  it("accepts a complete registration draft", () => {
    const result = registrationSchema.safeParse({
      name: "Anjali Mathew",
      email: "anjali@example.com",
      school: "St. John's School, Anchal",
      team: "Storm Crafters",
    });

    expect(result.success).toBe(true);
  });

  it("rejects incomplete or malformed entries", () => {
    const result = registrationSchema.safeParse({
      name: "A",
      email: "not-an-email",
      school: "",
    });

    expect(result.success).toBe(false);
  });
});

import { describe, expect, it } from "vitest";
import { matchRegistrationConfirmation, registrationConfirmationFrameName } from "../shared/registrationConfirmation";

describe("Google Sheets registration client", () => {
  it("accepts a matching Apps Script confirmation", () => {
    expect(matchRegistrationConfirmation("https://script.googleusercontent.com", { source: "hackfinity-registration", nonce: "expected", ok: true }, "expected")).toEqual({ source: "hackfinity-registration", nonce: "expected", ok: true });
  });

  it("rejects confirmations with the wrong origin or nonce", () => {
    const payload = { source: "hackfinity-registration", nonce: "wrong", ok: true };

    expect(matchRegistrationConfirmation("https://example.com", payload, "expected")).toBeNull();
    expect(matchRegistrationConfirmation("https://script.google.com", payload, "expected")).toBeNull();
  });

  it("accepts a nested Apps Script response only when its nonce matches", () => {
    const nestedResponse = { source: "hackfinity-registration", nonce: "session-nonce", ok: false };

    expect(matchRegistrationConfirmation("https://script.googleusercontent.com", nestedResponse, "session-nonce")).toEqual(nestedResponse);
    expect(matchRegistrationConfirmation("https://script.googleusercontent.com", nestedResponse, "different-nonce")).toBeNull();
  });

  it("keeps the confirmation transport isolated from the visible form", () => {
    expect(registrationConfirmationFrameName).toBe("hackfinity-registration-confirmation");
  });
});

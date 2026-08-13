import { describe, expect, it } from "vitest";
import { matchRegistrationConfirmation, registrationConfirmationFrameName } from "../shared/registrationConfirmation";

describe("Google Sheets registration client", () => {
  it("accepts a matching same-origin callback confirmation", () => {
    expect(matchRegistrationConfirmation("https://hackfinity-st-john-s.github.io", { source: "hackfinity-registration", nonce: "expected", ok: true }, "expected", "https://hackfinity-st-john-s.github.io")).toEqual({ source: "hackfinity-registration", nonce: "expected", ok: true });
  });

  it("rejects confirmations with the wrong origin or nonce", () => {
    const payload = { source: "hackfinity-registration", nonce: "wrong", ok: true };

    expect(matchRegistrationConfirmation("https://example.com", payload, "expected", "https://hackfinity-st-john-s.github.io")).toBeNull();
    expect(matchRegistrationConfirmation("https://hackfinity-st-john-s.github.io", payload, "expected", "https://hackfinity-st-john-s.github.io")).toBeNull();
  });

  it("accepts only the expected same-origin callback", () => {
    const callbackResponse = { source: "hackfinity-registration", nonce: "session-nonce", ok: false };

    expect(matchRegistrationConfirmation("https://hackfinity-st-john-s.github.io", callbackResponse, "session-nonce", "https://hackfinity-st-john-s.github.io")).toEqual(callbackResponse);
    expect(matchRegistrationConfirmation("https://hackfinity-st-john-s.github.io", callbackResponse, "different-nonce", "https://hackfinity-st-john-s.github.io")).toBeNull();
    expect(matchRegistrationConfirmation("https://script.googleusercontent.com", callbackResponse, "session-nonce", "https://hackfinity-st-john-s.github.io")).toBeNull();
  });

  it("keeps the confirmation transport isolated from the visible form", () => {
    expect(registrationConfirmationFrameName).toBe("hackfinity-registration-confirmation");
  });
});

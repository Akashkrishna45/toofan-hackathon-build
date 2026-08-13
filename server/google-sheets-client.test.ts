import { describe, expect, it } from "vitest";
import { matchRegistrationConfirmation } from "../shared/registrationConfirmation";

describe("Google Sheets registration client", () => {
  it("accepts a matching browser-readable Apps Script confirmation", () => {
    expect(matchRegistrationConfirmation({ source: "hackfinity-registration", nonce: "expected", ok: true }, "expected")).toEqual({ source: "hackfinity-registration", nonce: "expected", ok: true });
  });

  it("rejects confirmations with the wrong origin or nonce", () => {
    const payload = { source: "hackfinity-registration", nonce: "wrong", ok: true };

    expect(matchRegistrationConfirmation(payload, "expected")).toBeNull();
    expect(matchRegistrationConfirmation({ ...payload, nonce: "expected", ok: "yes" }, "expected")).toBeNull();
  });

  it("accepts only a response with the submission nonce", () => {
    const response = { source: "hackfinity-registration", nonce: "session-nonce", ok: false };

    expect(matchRegistrationConfirmation(response, "session-nonce")).toEqual(response);
    expect(matchRegistrationConfirmation(response, "different-nonce")).toBeNull();
  });

  it("continues polling when the nonce-only status response is pending", () => {
    expect(matchRegistrationConfirmation({ source: "hackfinity-registration", nonce: "session-nonce", pending: true }, "session-nonce")).toBeNull();
  });
});

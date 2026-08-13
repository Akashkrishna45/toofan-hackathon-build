import { describe, expect, it } from "vitest";
import { getRegistrationSubmissionState } from "../shared/registrationSubmission";

describe("Registration confirmation state", () => {
  it("marks an accepted nonce-matched endpoint response as submitted", () => {
    expect(getRegistrationSubmissionState({ source: "hackfinity-registration", nonce: "session-nonce", ok: true }, "session-nonce")).toBe("submitted");
  });

  it("marks a rejected nonce-matched endpoint response as rejected", () => {
    expect(getRegistrationSubmissionState({ source: "hackfinity-registration", nonce: "session-nonce", ok: false }, "session-nonce")).toBe("rejected");
  });

  it("marks an invalid, pending, or mismatched response as unavailable", () => {
    expect(getRegistrationSubmissionState({ source: "hackfinity-registration", nonce: "different-nonce", ok: true }, "session-nonce")).toBe("unavailable");
    expect(getRegistrationSubmissionState({ source: "hackfinity-registration", nonce: "session-nonce", pending: true }, "session-nonce")).toBe("unavailable");
    expect(getRegistrationSubmissionState(null, "session-nonce")).toBe("unavailable");
  });
});

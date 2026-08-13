import { matchRegistrationConfirmation } from "./registrationConfirmation";

export type RegistrationSubmissionState = "submitted" | "rejected" | "unavailable";

export function getRegistrationSubmissionState(value: unknown, expectedNonce: string): RegistrationSubmissionState {
  const confirmation = matchRegistrationConfirmation(value, expectedNonce);
  if (!confirmation) return "unavailable";
  return confirmation.ok ? "submitted" : "rejected";
}

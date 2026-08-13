export const registrationConfirmationFrameName = "hackfinity-registration-confirmation";

export type RegistrationConfirmation = {
  source: "hackfinity-registration";
  nonce: string;
  ok: boolean;
};

export function matchRegistrationConfirmation(origin: string, value: unknown, expectedNonce: string | null, expectedOrigin: string): RegistrationConfirmation | null {
  if (origin !== expectedOrigin || !expectedNonce || !value || typeof value !== "object") return null;

  const candidate = value as Partial<RegistrationConfirmation>;
  if (candidate.source !== "hackfinity-registration" || candidate.nonce !== expectedNonce || typeof candidate.ok !== "boolean") return null;

  return candidate as RegistrationConfirmation;
}

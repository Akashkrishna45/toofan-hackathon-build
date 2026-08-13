export type RegistrationConfirmation = {
  source: "hackfinity-registration";
  nonce: string;
  ok: boolean;
};

export function matchRegistrationConfirmation(value: unknown, expectedNonce: string): RegistrationConfirmation | null {
  if (!expectedNonce || !value || typeof value !== "object") return null;

  const candidate = value as Partial<RegistrationConfirmation>;
  if (candidate.source !== "hackfinity-registration" || candidate.nonce !== expectedNonce || typeof candidate.ok !== "boolean") return null;

  return candidate as RegistrationConfirmation;
}

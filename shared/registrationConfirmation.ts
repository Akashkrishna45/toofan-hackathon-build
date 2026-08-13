export const registrationConfirmationFrameName = "hackfinity-registration-confirmation";

export type RegistrationConfirmation = {
  source: "hackfinity-registration";
  nonce: string;
  ok: boolean;
};

function isAppsScriptOrigin(origin: string) {
  try {
    const host = new URL(origin).hostname;
    return host === "script.google.com" || host.endsWith(".googleusercontent.com");
  } catch {
    return false;
  }
}

export function matchRegistrationConfirmation(origin: string, value: unknown, expectedNonce: string | null): RegistrationConfirmation | null {
  if (!isAppsScriptOrigin(origin) || !expectedNonce || !value || typeof value !== "object") return null;

  const candidate = value as Partial<RegistrationConfirmation>;
  if (candidate.source !== "hackfinity-registration" || candidate.nonce !== expectedNonce || typeof candidate.ok !== "boolean") return null;

  return candidate as RegistrationConfirmation;
}

import { z } from "zod";

export const registrationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(80),
  email: z.string().trim().email("Enter a valid email address."),
  school: z.string().trim().min(2, "Please enter your school or organisation.").max(120),
  team: z.string().trim().max(80).optional(),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

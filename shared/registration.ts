import { z } from "zod";

export const registrationCategories = [
  "Awareness Challenge",
  "Prevention Challenge",
  "Recovery & Rehabilitation Challenge",
  "Innovation Challenge",
] as const;

export const studentSkillOptions = [
  "Artificial Intelligence",
  "Robotics",
  "Engineering",
  "Biotechnology",
  "Design Thinking",
  "Digital Technologies",
  "Entrepreneurship",
] as const;

export const registrationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(80),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().regex(/^[0-9+\-()\s]{8,20}$/, "Enter a valid contact number."),
  grade: z.string().trim().min(1, "Please enter your class or grade.").max(30),
  school: z.string().trim().min(2, "Please enter your school.").max(120),
  district: z.string().trim().min(2, "Please enter your district or city.").max(80),
  guardianName: z.string().trim().min(2, "Please enter a parent or guardian name.").max(80),
  guardianPhone: z.string().trim().regex(/^[0-9+\-()\s]{8,20}$/, "Enter a valid guardian contact number."),
  team: z.string().trim().max(80).optional(),
  teamSize: z.enum(["1", "2", "3", "4", "5", "6"]),
  registrationRole: z.enum(["Individual Participant", "Team Lead", "Team Member"]),
  category: z.enum(registrationCategories),
  skills: z.array(z.enum(studentSkillOptions)).min(1, "Select at least one area of interest."),
  projectInterest: z.string().trim().max(500, "Keep your project idea within 500 characters.").optional(),
  consent: z.boolean().refine((value) => value, "Please confirm that the information is accurate and shared with permission."),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

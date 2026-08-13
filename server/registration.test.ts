import { describe, expect, it } from "vitest";
import { registrationSchema } from "@shared/registration";

describe("TOOFAN registration validation", () => {
  it("accepts a complete registration draft", () => {
    const result = registrationSchema.safeParse({
      name: "Anjali Mathew",
      email: "anjali@example.com",
      phone: "+91 98765 43210",
      grade: "Class XI",
      school: "St. John's School, Anchal",
      district: "Kollam",
      guardianName: "Anu Mathew",
      guardianPhone: "+91 98765 43211",
      team: "Storm Crafters",
      teamSize: "4",
      registrationRole: "Team Lead",
      category: "Awareness Challenge",
      skills: ["Artificial Intelligence", "Design Thinking"],
      projectInterest: "An interactive campaign that helps students understand the risks of substance abuse.",
      teamMembers: [
        { name: "Arjun Das", grade: "Class XI", phone: "+91 98765 43212", email: "arjun@example.com" },
        { name: "Maya Nair", grade: "Class XI", phone: "+91 98765 43213", email: "maya@example.com" },
        { name: "Rohan Paul", grade: "Class XI", phone: "+91 98765 43214", email: "rohan@example.com" },
      ],
      consent: true,
    });

    expect(result.success).toBe(true);
  });

  it("rejects incomplete or malformed entries", () => {
    const result = registrationSchema.safeParse({
      name: "A",
      email: "not-an-email",
      phone: "123",
      grade: "",
      school: "",
      district: "",
      guardianName: "",
      guardianPhone: "123",
      teamSize: "7",
      registrationRole: "",
      category: "",
      skills: [],
      teamMembers: [],
      consent: false,
    });

    expect(result.success).toBe(false);
  });

  it("requires an explicit consent confirmation", () => {
    const result = registrationSchema.safeParse({
      name: "Anjali Mathew",
      email: "anjali@example.com",
      phone: "+91 98765 43210",
      grade: "Class XI",
      school: "St. John's School, Anchal",
      district: "Kollam",
      guardianName: "Anu Mathew",
      guardianPhone: "+91 98765 43211",
      teamSize: "1",
      registrationRole: "Individual Participant",
      category: "Innovation Challenge",
      skills: ["Engineering"],
      teamMembers: [],
      consent: false,
    });

    expect(result.success).toBe(false);
  });

  it("requires complete details for every additional team member", () => {
    const result = registrationSchema.safeParse({
      name: "Anjali Mathew",
      email: "anjali@example.com",
      phone: "+91 98765 43210",
      grade: "Class XI",
      school: "St. John's School, Anchal",
      district: "Kollam",
      guardianName: "Anu Mathew",
      guardianPhone: "+91 98765 43211",
      teamSize: "3",
      registrationRole: "Team Lead",
      category: "Innovation Challenge",
      skills: ["Engineering"],
      teamMembers: [{ name: "Arjun Das", grade: "Class XI", phone: "+91 98765 43212", email: "arjun@example.com" }],
      consent: true,
    });

    expect(result.success).toBe(false);
  });
});

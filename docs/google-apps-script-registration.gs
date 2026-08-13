/**
 * Hackfinity 2026 registration receiver
 *
 * Bind this script to the organizer's Google Sheet. It writes validated
 * registrations to the "Registrations" tab.
 */
const REGISTRATION_SHEET_NAME = "Registrations";
const HACKFINITY_PARENT_ORIGIN = "https://hackfinity-st-john-s.github.io";
const HACKFINITY_CONFIRMATION_URL = "https://hackfinity-st-john-s.github.io/hackfinity/registration-confirmation.html";
const REGISTRATION_HEADERS = [
  "Record ID",
  "Submitted at",
  "Full name",
  "Email address",
  "Student contact",
  "Class / Grade",
  "School name",
  "District / City",
  "Parent / Guardian name",
  "Parent / Guardian contact",
  "Team name",
  "Team size",
  "Registration role",
  "Preferred challenge category",
  "Areas to explore",
  "Project interest",
  "Consent confirmed",
  "Team member details",
];

const VALID_CATEGORIES = new Set([
  "Awareness Challenge",
  "Prevention Challenge",
  "Recovery & Rehabilitation Challenge",
  "Innovation Challenge",
]);

const VALID_SKILLS = new Set([
  "Artificial Intelligence",
  "Robotics",
  "Engineering",
  "Biotechnology",
  "Design Thinking",
  "Digital Technologies",
  "Entrepreneurship",
]);

function doGet() {
  return jsonResponse({ ok: true, service: "Hackfinity registration receiver" });
}

function doPost(event) {
  let payload = {};
  try {
    payload = getPayload(event);

    // Quietly reject automated submissions that fill the hidden honeypot field.
    if (String(payload.website || "").trim()) {
      return confirmationResponse(payload.nonce, true);
    }

    const registration = validateRegistration(payload);
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    try {
      const sheet = getRegistrationSheet();
      sheet.appendRow([
        Utilities.getUuid(),
        new Date(),
        registration.name,
        registration.email,
        registration.phone,
        registration.grade,
        registration.school,
        registration.district,
        registration.guardianName,
        registration.guardianPhone,
        registration.team,
        registration.teamSize,
        registration.registrationRole,
        registration.category,
        registration.skills.join(" • "),
        registration.projectInterest,
        "Yes",
        formatTeamMembers(registration.teamMembers),
      ]);
    } finally {
      lock.releaseLock();
    }

    return confirmationResponse(payload.nonce, true);
  } catch (error) {
    console.error(error);
    return confirmationResponse(payload.nonce, false);
  }
}

function getPayload(event) {
  if (event?.parameter?.payload) return JSON.parse(event.parameter.payload);
  return JSON.parse(event?.postData?.contents || "{}");
}

function getRegistrationSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(REGISTRATION_SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(REGISTRATION_SHEET_NAME);
  }

  const currentHeaders = sheet.getRange(1, 1, 1, REGISTRATION_HEADERS.length).getDisplayValues()[0];
  if (sheet.getLastRow() === 0 || REGISTRATION_HEADERS.some((header, index) => currentHeaders[index] !== header)) {
    sheet.getRange(1, 1, 1, REGISTRATION_HEADERS.length).setValues([REGISTRATION_HEADERS]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function validateRegistration(payload) {
  const name = text(payload.name, 2, 80, "full name");
  const email = text(payload.email, 3, 160, "email address").toLowerCase();
  const phone = phoneNumber(payload.phone, "student contact");
  const grade = text(payload.grade, 1, 30, "class or grade");
  const school = text(payload.school, 2, 120, "school name");
  const district = text(payload.district, 2, 80, "district or city");
  const guardianName = text(payload.guardianName, 2, 80, "parent or guardian name");
  const guardianPhone = phoneNumber(payload.guardianPhone, "parent or guardian contact");
  const team = optionalText(payload.team, 80);
  const teamSize = String(payload.teamSize || "");
  const registrationRole = String(payload.registrationRole || "");
  const category = String(payload.category || "");
  const skills = Array.isArray(payload.skills) ? payload.skills.map((skill) => String(skill)) : [];
  const projectInterest = optionalText(payload.projectInterest, 500);
  const teamMembers = Array.isArray(payload.teamMembers) ? payload.teamMembers : [];

  if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("Invalid email address.");
  if (!/^[1-6]$/.test(teamSize)) throw new Error("Invalid team size.");
  if (!["Individual Participant", "Team Lead", "Team Member"].includes(registrationRole)) throw new Error("Invalid registration role.");
  if (!VALID_CATEGORIES.has(category)) throw new Error("Invalid challenge category.");
  if (!skills.length || skills.some((skill) => !VALID_SKILLS.has(skill))) throw new Error("Invalid areas to explore.");
  if (teamMembers.length !== Number(teamSize) - 1) throw new Error("Missing team member details.");
  if (payload.consent !== true) throw new Error("Consent is required.");

  return {
    name,
    email: safeForSheet(email),
    phone,
    grade,
    school,
    district,
    guardianName,
    guardianPhone,
    team,
    teamSize,
    registrationRole,
    category,
    skills: skills.map(safeForSheet),
    projectInterest,
    teamMembers: teamMembers.map((member, index) => validateTeamMember(member, index)),
  };
}

function validateTeamMember(member, index) {
  if (!member || typeof member !== "object") throw new Error(`Invalid team member ${index + 2}.`);
  const name = text(member.name, 2, 80, `team member ${index + 2} name`);
  const email = text(member.email, 3, 160, `team member ${index + 2} email`).toLowerCase();
  const phone = phoneNumber(member.phone, `team member ${index + 2} contact`);
  const grade = text(member.grade, 1, 30, `team member ${index + 2} class or grade`);

  if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error(`Invalid team member ${index + 2} email.`);
  return { name, email: safeForSheet(email), phone, grade };
}

function formatTeamMembers(teamMembers) {
  return teamMembers.map((member, index) => `Member ${index + 2}: ${member.name} | ${member.grade} | ${member.phone} | ${member.email}`).join("\n");
}

function text(value, minimum, maximum, field) {
  const result = String(value || "").trim();
  if (result.length < minimum || result.length > maximum) throw new Error(`Invalid ${field}.`);
  return safeForSheet(result);
}

function optionalText(value, maximum) {
  const result = String(value || "").trim();
  if (result.length > maximum) throw new Error("Text is too long.");
  return safeForSheet(result);
}

function phoneNumber(value, field) {
  const result = String(value || "").trim();
  if (!/^[0-9+\-()\s]{8,20}$/.test(result)) throw new Error(`Invalid ${field}.`);
  return safeForSheet(result);
}

function safeForSheet(value) {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}

function confirmationResponse(nonce, ok) {
  const confirmationUrl = `${HACKFINITY_CONFIRMATION_URL}?nonce=${encodeURIComponent(String(nonce || ""))}&ok=${ok ? "1" : "0"}`;
  return HtmlService.createHtmlOutput(`<script>window.location.replace(${JSON.stringify(confirmationUrl)});</script><meta http-equiv="refresh" content="0; url=${confirmationUrl}">`)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

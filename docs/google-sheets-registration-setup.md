# Google Sheets Registration Setup

This guide connects the Hackfinity registration form to the organiser’s Google Sheet without placing passwords, keys, or private credentials in the public website.

## 1. Open the organiser sheet

Open the organiser spreadsheet and confirm that the registration tab is named **`Registrations`**. It may be empty; the script will create the tab and its headers if it does not already exist.

## 2. Add the sheet-bound script

Choose **Extensions → Apps Script**. Delete the default code, then copy the complete contents of [`google-apps-script-registration.gs`](./google-apps-script-registration.gs) into the editor. Save the project with a recognisable name such as **Hackfinity Registration Receiver**.

## 3. Deploy it as a web app

Choose **Deploy → New deployment**, select **Web app**, and use the following settings.

| Setting | Value |
|---|---|
| Description | `Hackfinity registration receiver` |
| Execute as | **Me** (the organiser who owns the sheet) |
| Who has access | **Anyone** |

Complete Google’s authorization prompts. Copy the resulting **Web app URL**. It begins with `https://script.google.com/macros/s/` and ends with `/exec`.

> The URL is public because the event website must reach it. It contains no Google password or private key. The script validates the expected registration fields, rejects honeypot submissions, and writes only to the bound organiser sheet.

## 4. Send the deployment URL to the project maintainer

Send the full `/exec` URL. The website will use it only to submit validated registration fields. The project maintainer will then update the public form and test a single, clearly labelled registration submission with the organiser.

## Spreadsheet columns

The first submitted registration creates the following columns in the `Registrations` tab: Record ID, Submitted at, Full name, Email address, Student contact, Class / Grade, School name, District / City, Parent / Guardian name, Parent / Guardian contact, Team name, Team size, Registration role, Preferred challenge category, Areas to explore, Project interest, and Consent confirmed.

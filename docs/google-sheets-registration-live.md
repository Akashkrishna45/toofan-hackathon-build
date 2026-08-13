# Live Google Sheets Registration Connection

## Owner and destination

Hackfinity registrations are configured for the organiser’s official-account Google Sheet:

> https://docs.google.com/spreadsheets/d/1J-8rB9WvfQOte8urwIVV5bF4ZkPW3-HaeYV1BB_UG2I/edit

The official Google Apps Script web endpoint is:

> https://script.google.com/macros/s/AKfycbyEIVN6XTAyt2i40exs0NddW3tRtuoAHbkDbt0sSth9T2Jd8uEg1_UHPyuJRTnMA_Pl4Q/exec

The endpoint health check returned `{"ok":true,"service":"Hackfinity registration receiver"}`. An approved test registration named **SYSTEM TEST — OFFICIAL ACCOUNT — DELETE AFTER CHECK** was accepted with HTTP 200 and confirmed visible in the official `Registrations` tab.

## Website submission behavior

The public static GitHub Pages form validates the complete registration locally, then sends an encoded JSON payload to the official Apps Script endpoint as a simple cross-site request. This is compatible with Google Apps Script’s redirected web-app responses. The form includes an invisible honeypot field and reports an accurate sent or retry state to the student.

No Google password, private key, or private email address is present in the public site code. The public web-app URL permits registration delivery but does not grant visitors read access to the organiser’s Sheet.

## Event-day housekeeping

After confirming the connection, the organiser may delete the labelled **SYSTEM TEST** row from the `Registrations` tab. Do not delete the row headers created by the script.

## Public deployment verification

The public GitHub Pages deployment for commit `84c8efa` completed successfully. The live registration section at `https://hackfinity-st-john-s.github.io/hackfinity/` displays **REGISTRATION SYSTEM: LIVE**, the student-facing submission controls, and the official-account delivery copy.

The deployed JavaScript bundle was also checked directly and contains the official Apps Script endpoint listed above. No registration was submitted during this public verification.

## Confirmation-flow validation

After the nonce-verified confirmation upgrade was deployed, one organiser-approved non-student entry named **SYSTEM TEST — VERIFIED CONFIRMATION — DELETE AFTER CHECK** was submitted through the live public form. The form entered its explicit **Sending application…** state while awaiting the confirmation response from the official Apps Script deployment.

The organiser confirmed that this exact labelled row appeared in the official `Registrations` tab. This verifies that the public form, deployed Apps Script, and official event-owned Sheet complete the registration write successfully. The browser did not receive the Apps Script message because the returned confirmation can travel through a nested Google frame whose `WindowProxy` does not match the outer target iframe. The client now accepts this response based on its strict Google origin and one-time matching nonce, rather than on that unreliable nested-frame identity. Automated acceptance and rejection checks pass locally; final live browser confirmation remains to be checked after publication.

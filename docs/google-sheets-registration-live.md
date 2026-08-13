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

Commit `730ccb0` (`Fix nested-frame confirmation message routing`) completed its GitHub Pages deployment successfully. The final browser confirmation check is being run against that published revision.

For the final labelled verification entry, the deployed form reported no invalid required fields and both the required skill selection and consent checkbox were recognised. Its native submit path was then triggered once for the response observation.

The form initially rejected a non-schema team-size label without sending it. After the underlying valid value was selected, the same labelled entry entered the visible **Sending application…** state, confirming that the normal client submission handler is now awaiting the official response.

The published form subsequently reached its **We could not confirm your registration right now** state. Removing the nested-frame source check therefore did not restore the browser response. The remaining fault is the outbound handoff from Google Apps Script’s HTML-service sandbox, not the validated form payload or the client’s nonce match. No additional test submission will be made without organiser confirmation.

With organiser approval, one final entry named **SYSTEM TEST — MESSAGE DIAGNOSTIC — DELETE AFTER CHECK** was prepared with a passive top-window message recorder active before submission. It entered the normal **Sending application…** state; the recorder had received no message at the initial 100 ms observation point.

## Pending team-member and confirmation update

The website source now collects full name, class/grade, student contact number, and email address for every additional member required by the selected team size. The supplied Apps Script source has matching validation and a `Team member details` Sheet column. It also replaces the sandboxed `postMessage` response with a redirect to the site’s same-origin `registration-confirmation.html` callback, which then posts the nonce-verified result to the parent page.

These additions are **not yet live** until the organiser replaces the official Apps Script with the updated source and creates a new web-app deployment. After both the website and script are published, one organiser-approved labelled test can verify that the browser displays the confirmed state and that the new Sheet column is populated.

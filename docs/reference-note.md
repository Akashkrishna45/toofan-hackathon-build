# Reference Website Access Note

The user supplied `https://hackfinit.netlify.app/` as a visual reference on 12 August 2026. The URL redirected to Netlify team-protection sign-in in the current viewing session. Its published content could not be accessed and will not be copied or inferred from protected content.

The project will continue with its approved original TOOFAN design system: storm-inspired depth, accessible motion, mobile-first layout, St. John’s School, Anchal host branding, and HOWNWHY partner branding.

## Asset-load verification note

On 12 August 2026, the live Hackfinity preview rendered both St. John’s logo elements with a `naturalWidth` of `0`, although the local asset route issued a valid redirect when checked from the server. The header therefore displayed the required logo container but not the image contents. The next iteration must use a browser-reachable asset URL or verified image-delivery route before the St. John’s image placement can be marked complete.

After forcing a cache-busted asset request on the same date, the live preview continued to display the logo container without the school artwork. Direct browser `fetch()` to the asset route returned a valid JPEG response, which suggests a browser image-element delivery issue rather than a missing file. The final implementation should add a resilient, layout-safe fallback while retaining the protected asset URL as its source of truth.

The resilient loader was added and verified in the live browser. Both the header and venue logo elements now use a decoded browser blob URL and report natural dimensions of 1920×1080, confirming successful image delivery without altering the protected source asset.

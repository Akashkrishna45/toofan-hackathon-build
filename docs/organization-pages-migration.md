# Hackfinity Organization Pages Migration

The repository was transferred from the personal GitHub account to the `Hackfinity-ST-JOHN-S` organization and renamed to `hackfinity`.

The verified public site address is:

> https://hackfinity-st-john-s.github.io/hackfinity/

GitHub Pages is deployed through the repository workflow. The post-rename workflow build correctly uses the `/hackfinity/` repository base path. The public homepage was verified after rebuilding, and an unknown direct link beneath `/hackfinity/` was verified to return visitors to the Hackfinity homepage instead of a 404 screen.

The static `404.html` fallback derives the repository segment from the request path, so it remains compatible with the current `hackfinity` project path and future repository renames.

## Route-recovery safeguard publication

Commit `bcc9236` (`Fix Pages route recovery after organization rename`) was pushed directly to `Hackfinity-ST-JOHN-S/hackfinity` after the project’s managed GitHub link remained tied to the original personal repository. The `Deploy Hackfinity to GitHub Pages` workflow completed successfully for that commit.

The public root URL was verified with a cache-busting request, and the direct unknown path `/hackfinity/recovery-check` automatically returned to the Hackfinity homepage without displaying the internal 404 card or requiring a **Go Home** click.

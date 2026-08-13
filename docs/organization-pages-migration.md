# Hackfinity Organization Pages Migration

The repository was transferred from the personal GitHub account to the `Hackfinity-ST-JOHN-S` organization and renamed to `hackfinity`.

The verified public site address is:

> https://hackfinity-st-john-s.github.io/hackfinity/

GitHub Pages is deployed through the repository workflow. The post-rename workflow build correctly uses the `/hackfinity/` repository base path. The public homepage was verified after rebuilding, and an unknown direct link beneath `/hackfinity/` was verified to return visitors to the Hackfinity homepage instead of a 404 screen.

The static `404.html` fallback derives the repository segment from the request path, so it remains compatible with the current `hackfinity` project path and future repository renames.

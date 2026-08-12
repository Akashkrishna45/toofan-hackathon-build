# GitHub Pages deployment

This repository includes `.github/workflows/deploy-pages.yml`. It produces a static GitHub Pages build when changes reach the `main` branch.

The supplied St. John’s School logo is bundled at `client/public/assets/st-johns-school.jpg`. The frontend uses Vite’s repository-aware base path, so the logo resolves both in local preview and at the GitHub Pages project URL.

## Enable the deployment

Open the repository’s **Settings → Pages** panel and choose **GitHub Actions** under *Build and deployment*. Then push the workflow to `main`, or use **Actions → Deploy Hackfinity to GitHub Pages → Run workflow**.

The public address will be:

```text
https://akashkrishna45.github.io/toofan-hackathon-build/
```

## Registration limitation

GitHub Pages serves static browser files only. The website’s student-application form remains in review-only mode on GitHub Pages: it validates data locally but does not store submissions. To collect registrations in Google Sheets, deploy a separate protected backend or serverless endpoint and supply the required Google Sheets credentials there. Do not put Google credentials in this repository or in browser code.

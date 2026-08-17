# Mobile Hero Layout Validation

The mobile hero reserved-zone correction was reviewed in the development preview on 17 August 2026.

| Viewport | Result |
| --- | --- |
| 360 × 800 | The field brief is separate from the St. John’s presenter line and the Hackfinity wordmark; the title, actions, and countdown remain readable. |
| 390 × 844 | The field brief retains clear space above the presenter line; the title, intro, actions, countdown, and event metadata remain distinct. |
| 414 × 896 | The original failure width now keeps the field brief, presenter line, full Hackfinity wordmark, call-to-action row, countdown, and event metadata separated. |
| 1280 × 720 | The desktop hero composition is unchanged by the mobile-only reserved-zone rule. |

The header was also checked at mobile and desktop widths after replacing only its abstract symbol with the supplied official St. John’s School crest. The existing `Hosted by St. John’s School · Anchal` text remains unchanged.

GitHub Pages deployment `8cc3b89` completed successfully. The public crest asset at `/hackfinity/assets/st-johns-school-official-crest.jpg` returned HTTP 200 with an `image/jpeg` content type, confirming that the supplied crest is available at the live repository-aware path.

A fresh live GitHub Pages verification rendered both the normal desktop page and a temporary 414px embedded viewport from the same deployed URL. In both layouts, the official crest displayed beside the unchanged `Hosted by St. John’s School · Anchal` lockup. The 414px viewport also confirmed that the field brief, presenter line, Hackfinity wordmark, actions, countdown, and event metadata remain visually separate.

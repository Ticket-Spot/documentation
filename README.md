# Ticket Spot documentation

Customer guides are MDX files. `docs.json` defines navigation and branding. Keep existing guide URLs stable and link related workflows instead of duplicating instructions.

## Content sources

Validate UI labels and behavior against the dashboard and relevant checkout, server, mobile, POS, or integration implementation. `src/modules/sites/plan-feature-list.json` in the dashboard is the 111-feature coverage inventory; pricing and allowances also come from server plan configuration. Basic Brand logo and shared colors are included on all plans.

Each article needs a descriptive title, unique description, entry point, prerequisites, steps, expected result, and useful related links. Use screenshots to support the text, not replace instructions. Never publish API credentials or real attendee data in media.

## Preview and validation

Use the Mintlify CLI to preview `docs.json` and MDX content. Check navigation, links, media, desktop/mobile rendering, and the workflows described before release. Publishing behavior depends on this repository's Mintlify deployment connection; editing files locally does not publish them.

# Ticket Spot documentation

Customer guides are MDX files. `docs.json` defines navigation and branding. Keep existing guide URLs stable and link related workflows instead of duplicating instructions.

## Content sources

Validate UI labels and behavior against the dashboard and relevant checkout, server, mobile, POS, or integration implementation. `src/modules/sites/plan-feature-list.json` in the dashboard is the 111-feature coverage inventory; pricing and allowances also come from server plan configuration. Basic Brand logo and shared colors are included on all plans.

Each article needs a descriptive title, unique description, entry point, prerequisites, steps, expected result, and useful related links. Use screenshots to support the text, not replace instructions. Never publish API credentials or real attendee data in media.

## Search intent and SEO

Use [the Ahrefs keyword review](SEO_REVIEW.md) and its [saved research](seo/ahrefs-2026-10-01.json) when updating guide titles and descriptions. Prefer the phrase that accurately describes the task; keep product-specific instructions even when keyword volume is low or unavailable. Use `sidebarTitle` for a shorter navigation label when needed. Keep guide URLs stable, link to the guide that owns a topic, and distinguish setup instructions from the main site's product and comparison pages. Recheck dated keyword estimates before treating them as current evidence.

## Preview and validation

Use the Mintlify CLI to preview `docs.json` and MDX content. Check navigation, links, media, desktop/mobile rendering, and the workflows described before release. Publishing behavior depends on this repository's Mintlify deployment connection; editing files locally does not publish them.

Run these checks from this repository after installing the locked dependencies with `npm ci`:

```sh
python3 scripts/check-documentation.py
node scripts/check-mdx.mjs
npx mintlify broken-links
npx mintlify dev --no-open
```

The widget reference pages contain generated tables with hand-written setup notes around them. Refresh the tables from the dashboard checkout, then check source coverage:

```sh
python3 scripts/sync-widget-reference.py --dashboard /path/to/eventviewer-dashboard
python3 scripts/sync-widget-reference.py --dashboard /path/to/eventviewer-dashboard --check
python3 scripts/check-documentation.py --dashboard /path/to/eventviewer-dashboard
```

The source check compares every indexed widget control and all named plan features; it does not prove that authenticated purchases, delivery, or check-in work. Keep the generated option markers inside the reference pages. Update the surrounding workflow prose when behavior or prerequisites change.

The same source check compares the onboarding template IDs with `event-types/onboarding-map.json` and verifies that each maps to a navigable guide with a matching `onboardingTemplate` field. When onboarding changes, update the guide's starting choices and the coverage map together. See [the event-type review](EVENT_TYPE_REVIEW.md) for source evidence and the Ahrefs keyword decisions.

See [the October 2026 review](./DOCUMENTATION_REVIEW.md) for coverage, source evidence, product-label mismatches, and the remaining browser verification checklist.

## Developer API reference

The endpoint pages under `api-reference/endpoint` use Mintlify's OpenAPI playground. Refresh their contract from the server whenever v2 routes change, then validate the reference:

```sh
node scripts/sync-developer-api.cjs --server /path/to/wix-eventviewer-server
node scripts/sync-developer-api.cjs --server /path/to/wix-eventviewer-server --check
npx mintlify openapi-check api-reference/openapi.json
```

The server keeps a relative Swagger server URL for local use; the copied Mintlify contract uses the provisioned production base URL. Publish the server routes and new Datastore indexes before releasing the documentation. API usage appears in PostHog as `developer_api_request`; the server repository includes `posthog-developer-api-queries.sql` for usage and error insights.

## Product update documentation

Every What's New entry in the server repository's `content/product-updates` must link to the guide that explains its feature and include a relevant screenshot or GIF used in that guide. Update the instructions and media together, preserve existing guide URLs, and verify the published section and asset before releasing the server entry. Keep device/account-dependent captures explicitly pending rather than presenting unrelated or outdated images as current. The server's `docs/product-updates.md` describes the authoring and cross-repository validation workflow.

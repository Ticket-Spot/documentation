# Documentation screenshot and GIF plan

**Production approved.** The user approved the Platform Overview batch (14 screenshots, one zoom GIF and a static poster), then authorized the refresh of all remaining pages. Use the approved purple unfilled circle style (`#9c26dc`, 4 CSS pixels) and real UI captures. [Review the approved batch](media-review/first-page/index.html).

[Open the interactive review board](http://localhost:3336/media-review/index.html). It includes searchable capture briefs, every existing asset, article-by-article coverage, unreferenced files, and existing embedded videos. The files are also available at [media-review/index.html](media-review/index.html), [capture-plan.json](media-review/capture-plan.json), and [inventory.json](media-review/inventory.json).

**Refresh scope confirmed:** all existing Ticket Spot product screenshots and GIFs are candidates for fresh capture, including older product views already embedded in guides. Do not carry a legacy image forward merely because it still renders or its link works. Replace it with current UI or consolidate its instruction into a current shared capture. Unreferenced product images must also be checked before reuse. Brand logos and non-product artwork are listed separately and are not implicitly redesigned.

## Original inventory (before the refresh)

| Inventory | Count |
|---|---:|
| Documentation pages reviewed | 108 |
| Existing image placements | 546 |
| Unique images currently embedded | 543 |
| Existing PNG screenshots | 398 |
| Existing GIFs | 145 |
| Pages with no images today | 54 |
| Unreferenced local images/media | 118 |
| Existing embedded videos | 5 |
| Missing referenced local files | 0 |

The 118 unreferenced files include 111 assets under `assets/` plus branding/root/template media. They are recorded separately and retained for review. Eighteen groups of referenced files are byte-identical, with 37 redundant copies. Many navigation and click-by-click images can be consolidated into shared captures. Existing GIFs occupy approximately 339 MiB; the refresh should favor short focused clips and static images where motion adds no instruction.

## Current production list

**320 capture units: 269 annotated screenshots and 51 zoom GIFs.** Every planned GIF also has a static poster. The manifest covers all 110 current guides, including 54 that had no images in the original inventory. A brief may need multiple readable crops; static sequences can replace motion when they explain the steps more clearly.

A capture unit is a scene or settings panel, not one image for each of the 503 widget controls. Dense panels must be split into readable crops. Keep detailed reference tables searchable and use pictures to explain location, dependencies and results. Existing asset-to-capture matches are proposals based on article sections; confirm each placement during replacement.

| Area | Screenshots | Zoom GIFs | Capture units |
|---|---:|---:|---:|
| Account | 6 | 0 | 6 |
| Analytics | 14 | 1 | 15 |
| Api Reference | 1 | 0 | 1 |
| Attendee Management | 12 | 2 | 14 |
| Attendee Portal | 7 | 2 | 9 |
| Branding And Design | 81 | 11 | 92 |
| Event Management | 65 | 16 | 81 |
| Getting Started | 1 | 1 | 2 |
| Integrations | 22 | 1 | 23 |
| Memberships | 11 | 1 | 12 |
| Mobile App | 8 | 4 | 12 |
| On Site | 6 | 2 | 8 |
| Plugins | 14 | 5 | 19 |
| Seating Charts | 9 | 4 | 13 |
| Site Settings | 10 | 1 | 11 |
| Team | 3 | 0 | 3 |
| **Total** | **270** | **51** | **321** |

**P0 (159 units):** current event/ticket/day editors, waitlists, questions, Quick Settings, widget options, Shopify Ticket Selector, seating, and their customer-facing results. **P1 (162 units):** remaining branding/templates, memberships, attendee management, analytics, accounts, integrations, mobile and on-site tools. Priority is capture order, not omitted scope.

## Approved sample approach

1. **Annotated Quick Settings screenshot — `quick-settings-overview`.** Open Design → Widget → Quick Settings in Ticket Spot Demo. Crop to the application panel and relevant preview. Use three numbered circles: entry point, appearance/layout card, and preview result. This approves text size, crop, circle color/stroke, badge style and caption. Capture the real controls and preserve enough context to locate them.
2. **Settings-search zoom GIF — `quick-settings-search`.** Start in the same widget. Search for “Show end time,” open the matching setting through its breadcrumb, focus the control, change it, and hold on the preview result. Target 6–10 seconds, gentle 1.2–1.5× zoom, one cursor/click cue, and a 2-second result pause. Save a static poster too. Record the initial widget value and restore it after capture unless that value is intentionally retained in the demo.

The first-page sample batch has been approved. Continue across all pages without another per-page approval gate.

## Capture standard

- **No browser URL:** capture the web page or application element, never the whole browser window. Exclude tabs, toolbar, address bar, bookmarks, desktop and unrelated apps from every frame. Crop sensitive in-app URL/token fields or use harmless example values where the field itself is the subject.
- **Real product UI:** use the current Ticket Spot Demo interface. Do not use generated images or redraw product controls. Annotations identify real controls without covering their labels.
- **Readable framing:** start around 1440 × 900 desktop and 390 × 844 mobile at 2× density. Capture the relevant panel plus its outcome. Avoid tall, shrunken full-page screenshots. Use separate numbered crops for long panels.
- **Circles and labels:** use one consistent high-contrast accent, 3–4 px at display size, and at most three targets per frame. Circles suit individual controls; rounded outlines suit larger groups. Use a numbered badge and a matching caption.
- **Motion:** one action per GIF, typically 6–10 seconds and at most 12. Pause to orient the viewer, zoom gently, perform the action, then hold the result. No fast scrolling, bouncing zoom or repeated cursor movement. Include a static poster with the same explanation; do not rely on animation alone.
- **Delivery:** PNG for UI screenshots; optimized GIF and a static poster for motion. Keep a short video master if useful for later formats. Aim for a GIF under 5 MB, and shorten/split it rather than making text unreadable. Size is a target, not a substitute for quality.
- **Demo content:** recognizable neutral event names, synthetic attendees, two ticket prices, a series with date overrides, a timed-entry event, a capacity-limited waitlist, memberships, add-ons and assigned seating. Keep credentials, real OTPs, API keys, live payment details and unrelated personal data out of all frames.
- **Article placement:** short descriptive alt text, numbered callout caption, nearby instruction, shared image reuse where appropriate, and a usable static explanation for every GIF. Capture both setup and buyer result where the distinction matters.

## Capture fixtures and access

| Fixture | What it enables |
|---|---|
| **Demo Showcase** | Ticket editor, images, fees, access, required tickets, questions, approvals and add-ons. |
| **Demo Series** | Recurring/specific dates, custom day tickets, pass sales, capacity and seating inheritance. |
| **Demo Timed Entry** | Time slots, advance purchase, date selection and check-in windows. |
| **Demo Capacity Event** | Capacity 100, public threshold 80, and a separate threshold-zero example. |
| **Demo Reserved Seating** | Sections, Adult/Child prices in a category, selected/sold/unavailable seats, whole-table example and synthetic attendee reassignment. |
| **Demo Annual / Ten-Visit Pass** | Membership pricing, access, visit limits, numbering, holders and PDF output. |
| **Demo Documentation Widget** | Quick Settings, all seven settings categories, themes, fonts, colors, filters, text and responsive previews. |
| **Demo Shopify Product** | Actual product template, inline/modal selector, questions, memberships, seats, Thank You block and test checkout. |
| **Synthetic attendees / orders** | Portal, analytics, waitlist status, approvals, exports, check-in and ticket output. Use existing demo states or controlled test data. |
| **Demo external platforms / devices** | Shopify/Wix/WordPress/Lovable, integration test accounts, mobile app, wallets, Square sandbox, Star/Boca and kiosk. These cannot all be demonstrated from the dashboard alone. |

There are 239 capture units assigned to the Demo browser and 70 requiring another platform/session or a device as well. Some Demo views also need suitable existing data or plan features; browser access alone does not guarantee every state is available.

The dedicated Chrome capture browser is authenticated as Ticket Spot Demo and controllable through the existing capture helpers. Other platform accounts and physical devices still need their own available sessions. Never substitute a generated product screen for unavailable access.

For later captures, create/edit Demo events as authorized. Invitations, email/SMS/recovery/team messages are shown as composed previews unless a dedicated test recipient and delivery step are explicitly part of that capture. Payment flows use test mode. Account/provider disconnects, billing purchases and destructive confirmations can be illustrated without committing those actions.

## Known exceptions to resolve during capture

- **Day-ticket timing labels:** review the actual delayed-opening versus cutoff behavior before capturing instructional callouts.
- **Waitlist expiration:** the editable expiration field and current 48-hour invitation generation disagree.
- **Shopify private invoice with fixed capacity:** the mode label and checkout path disagree.

These are recorded in [DOCUMENTATION_REVIEW.md](DOCUMENTATION_REVIEW.md). Capture actual UI and use accurate captions; do not silently change the product in an image. Inventorying these shots does not certify that the product mismatches are fixed.

The 5 existing long-form video embeds need a separate freshness review. They remain in the inventory; a short GIF is not a replacement for an entire tutorial. Unreferenced and brand assets remain untouched.

## Completion check after style approval

Each old image placement must be replaced, relinked to a shared current asset, or deliberately removed with redundant prose updated. Each missing-visual guide receives its planned image or documented shared reference. Verify final label accuracy, complete workflow, frame-by-frame URL exclusion, callouts, alt text, file weight and desktop/mobile article rendering. Re-run media/link checks and inspect every changed guide before retiring legacy files.

## Production status — 1 October 2026

The approved first-page style is being applied across the documentation. The current reviewed screenshots, GIFs, pending captures, and actual article placements are reconciled in [progress.json](media-review/progress.json). The [review board](http://localhost:3336/media-review/index.html) shows current totals and the [production gallery](http://localhost:3336/media-review/production/index.html) shows the assets. The available Demo pass is reviewed. Capture counts do not establish completion of the deferred external, device, and conditional account states; see [remaining coverage](media-review/remaining-coverage.json).

The locale guide and FAQ have current widget-language screenshots and a communication-language zoom GIF. The language examples were checked in the actual product and in desktop/mobile documentation rendering.

The user confirmed external demo accounts are unavailable and requested deferral. All 70 external/device capture units are tracked in the [TODO list](media-review/EXTERNAL_TODO.md). Star and Boca dashboard design settings are captured; their physical outputs remain TODO.

## Final production batch — Analytics

**User requested Analytics last.** Finish the other available sections before the Analytics documentation and screenshot pass. Verify all current tabs: **Overview, Sales, Attendance, Traffic, Abandoned Carts, and Email** (the source currently exposes six). Include all event/occurrence filters, date presets and custom dates, interval controls, refresh/export behavior, metric definitions, charts, tables, detail views and available actions. Existing analytics articles and captures do not establish complete coverage; add an Email guide if needed.

The user explicitly authorized **temporary fake Analytics data instead of real API responses**, then restoration after screenshots. Prefer scoped Playwright response fixtures in the dedicated capture session so application code and stored records remain unchanged. Use coherent synthetic event, attendance, revenue, traffic, abandonment and email data. Identify the results as illustrative demo data in captions and the capture registry. Remove all fixture routes, reload with normal APIs, and verify restoration before completing this batch. Do not trigger recovery messages or email delivery while demonstrating action dialogs.

Expanded shot briefs are at the end of the capture manifest. Recheck the live UI when beginning the final batch because backend and dashboard work is ongoing.

## Explicit coverage follow-up (October 1)

Before the final Analytics batch, complete the attendee dashboard's statistics, search and filters, seating controls, detail/actions, and all exports; every section of new-ticket creation; site/widget Cart settings and buyer behavior; installments and their Stripe prerequisite; and every control in `day-drawer.tsx`, including custom ticket source/reversion, full ticket editing, capacity, waitlist, title, booking label, inheritance, save/discard, and seating errors.

The unused date-level “Ignore advance purchase window” checkbox was removed with user authorization and its screenshot brief retired. The functional ticket-level advance-purchase setting remains in scope.

## Final available Demo pass — October 1, 2026

All six Analytics guides now include 34 current, purple-circle screenshots with illustrative data identified in captions. The temporary browser response fixtures were removed; a full reload returned HTTP 200 from the real Overview API and real zero-valued Demo metrics, with no additional fixture interception. No Analytics source or stored data was changed. Evidence: [Analytics acceptance](media-review/production/analytics-acceptance.json).

The reviewed library totals 516 screenshots and 3 GIFs across 94 guides. All 112 public pages compile and render at desktop and 390px mobile widths without broken images, page errors, or horizontal overflow. Eleven Demo-state briefs, seventy external/device briefs (including partially captured setup screens), and five existing long videos remain on the follow-up list. Static sequences replace many originally proposed GIFs where they show the controls clearly; no browser address bar is included.

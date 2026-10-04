# Documentation media production

The purple-circle style and first-page assets are approved. The available Demo documentation/media pass is reviewed, including all six Analytics tabs. External accounts, devices, and conditional Demo states remain on the [TODO list](../EXTERNAL_TODO.md).

## Current state

- 575 reviewed screenshots and 3 reviewed GIFs across 103 guides; 3 companion posters.
- All 141 public guides compile and pass navigation/local-link checks. The original 112-guide media pass, 24-page onboarding follow-up, and six-guide attendee follow-up have desktop/mobile render checks without broken images or horizontal overflow in their respective acceptance records.
- `captures.json` records provenance, captions, visual review, and actual placements. Run `python3 scripts/update-media-progress.py` from the repository root after capture integration.
- [progress.json](../progress.json) contains current counts; [capture-plan.json](../capture-plan.json) tracks 347 planned briefs. A captured image does not establish complete acceptance of every dependent state.
- [remaining-coverage.json](../remaining-coverage.json) lists fourteen Demo-state dependencies, sixty-six external/device briefs, retained legacy images, and five long videos awaiting freshness review.
- [analytics-acceptance.json](analytics-acceptance.json) records temporary fixture cleanup and real export checks. Analytics fixtures were removed and the real API verified; no fixture data was written to stored records.
- [attendee-actions-acceptance.json](attendee-actions-acceptance.json) records 17 additional annotated screenshots, six rendered guides, nine checked heading links, and the unsubmitted refund/transfer/message boundaries. See [the action review](../../ATTENDEE_DASHBOARD_REVIEW.md) for the full menu inventory and conditional visual TODOs.

- [shopify-selector-acceptance.json](shopify-selector-acceptance.json) records nine fresh Shopify setup screenshots, the linked-product options, the FAQ, Ahrefs research, and desktop/mobile checks. Shopify Admin was captured through the user’s authenticated regular Chrome session without saving or publishing theme changes.

- [installment-acceptance.json](installment-acceptance.json) records manual and automatic Stripe sandbox collection, payment progress/filters, replacement-card recovery, organizer summaries, and final New Order email/PDF/QR rendering. Both automatic test orders collected exactly three $10 payments; concurrent manual/automatic requests and repeated worker deliveries produced no extra charges. Email transport was captured locally. The cloud installment cron is paused pending deployment; hosted webhooks, outbound email, financial rollups, browser 3DS, and the enabled ticket-editor setup capture remain separate checks.

## Review locally

From the repository root, serve the files with `python3 -m http.server 3336 --bind 127.0.0.1`, then open `http://localhost:3336/media-review/production/index.html`. Add `?area=analytics` to review only Analytics. Guide links expect a Mintlify preview on port 3335.

## Resume capture

Capture helpers require Playwright available to Node, either installed in the capture environment or exposed through `NODE_PATH`. GIF encoding additionally requires Python with Pillow. The normal documentation build does not depend on either capture tool.

For dashboard captures, connect to a dedicated Chrome capture session with the user signed into Ticket Spot Demo. Shopify Admin can instead use the user-authorized regular Chrome session when automated-browser login is unavailable; isolate capture in a separate window and close only that window afterward. The defaults are CDP `http://127.0.0.1:9227` and dashboard `http://localhost:8080/`; override them with `TICKETSPOT_CDP_URL` and `TICKETSPOT_DASHBOARD_URL`. Confirm the visible Demo site identity. During concurrent backend work, returning to `http://localhost:8080/#/` can restore the existing session after a redirect.

Load `capture.cjs` from a capture script, call `connect()`, and keep that connection alive during a batch. Bring the dashboard tab to the foreground before operating on it. `shot(page, id, options)` requires an ID in the plan and validates loading state, annotation targets, and crop boundaries before recording the asset. `first-page/record-widget.cjs` and `first-page/encode-gif.py` share the optional `TICKETSPOT_FRAMES` directory.

Use actual browser UI and application-only crops without the browser address bar. The approved circle is `#9c26dc`, unfilled, 4 CSS pixels, with at most three targets per image. Split long panels instead of shrinking controls. Conceal personal data and credentials. Do not send messages or perform payment actions to illustrate a confirmation screen.

Only Analytics was authorized to use temporary response fixtures. Keep them scoped to read-only requests, identify illustrative data in captions, remove the routes after capture, and verify the real API again. Other unavailable states remain TODO.

## Validation

Run `node scripts/check-mdx.mjs` and `python3 scripts/check-documentation.py --dashboard /path/to/eventviewer-dashboard`. Visually review each new image and its article placement on desktop and mobile. [validation.json](validation.json) records the latest checks; [rendered-guides.json](rendered-guides.json) contains per-route results. Temporary QA screenshots are review evidence rather than documentation assets.

- [self-service-payments-acceptance.json](self-service-payments-acceptance.json) records all shared Stripe payment actions, browser 3DS, declined-card recovery, early/automatic installment collection, cancellation/expiry, scoped access, concurrent creation, and recovery after a paid update failure. The new [manage payments guide](../../attendee-portal/manage-payments.mdx) uses ten reviewed screenshots and passes desktop/mobile rendering. Final New Order PDFs were regenerated after fixing numeric attendee QR IDs. Email and task transport were captured locally; production deployment, hosted webhooks and scheduler activation remain rollout checks.

- [seat-changes-acceptance.json](seat-changes-acceptance.json) records the optional attendee seat-change flow on a dedicated Seats.io test workspace with real Stripe test cards. It covers higher/equal/lower prices, full-capacity same-ticket moves, decline/retry, bank authentication, cancellation, expiry, and recovery after the seat swap. Three standard purple-circle captures are registered and integrated into the manage-payments guide; its desktop/mobile render checks pass. Four paid moves each received $20 once, and seven New Order ticket PDFs contained their updated seats. PayPal/Square sandbox purchases, device wallets and production delivery remain separate checks.

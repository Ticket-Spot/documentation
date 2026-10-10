# Ticket capacity documentation capture

The images render the actual shared TicketEditor and OverviewAnalytics components with synthetic data. They do not create real bookings, charge a payment provider, or use a production seating workspace.

In the dashboard checkout, run `node scripts/ticket-capacity-preview.cjs`. This builds an isolated fixture and serves it on `http://127.0.0.1:9231`. The `?analytics` view shows two $120 table tickets, twelve capacity places, and one check-in. `--build-only` validates the fixture without starting the server.

In this documentation checkout, run `node media-review/ticket-capacity/capture.cjs` with Playwright available on the Node module path and Google Chrome installed. It writes desktop 1440×900 and mobile 390×844 captures at 2× resolution. Settings captures collapse the price section and circle the capacity input in purple. The captures have no horizontal overflow or browser errors.

The field screenshot, mobile layout, and analytics screenshot were visually reviewed on October 10, 2026. Existing real chart designer screenshots in `seating-charts/advanced-layouts.mdx` show the Book by table setting; the new capacity article links to that configuration.

Validation completed during implementation:

- Server: 308 focused regressions covering capacity, availability, snapshots, groups, waitlists, transfers, quota holds, add-ons, seating configuration, checkout sessions, analytics rollups, and payment actions.
- Dashboard: 41 regressions for capacity payloads, duplication, recurring analytics, event cards, and waitlist settings.
- Widget: 88 checkout, attendee, summary, seating callback, and capacity-rule regressions, including a whole table plus an individual seat sharing a place budget.
- The preview bundle and all three changed MDX pages compile. Documentation navigation includes the capacity article.

The dashboard's repository-wide TypeScript check reports existing errors including Wix/React component typing and documentation-server diagnostics. The dashboard's waitlist file also has existing lint errors. The installed widget ESLint crashes in its internal code-path analyzer. These checks do not provide a clean verification result. No live vendor booking, production checkout, deployment, or rollup rebuild was performed.

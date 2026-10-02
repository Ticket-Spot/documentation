# Documentation review — 1 October 2026

The documentation now covers the current searchable widget inventory and the requested event, ticket, waitlist, design, Shopify selector, and seating workflows. The main gaps were detailed options and workflow changes, rather than missing top-level feature names.

The initial audit used local source and documentation previews. The subsequent media refresh uses the authenticated Ticket Spot Demo in a dedicated Chrome capture session. Current screenshots and GIFs are recorded with captions and visual QA in [the production registry](media-review/production/captures.json). The available Demo documentation/media pass is reviewed; [current progress](media-review/progress.json) and [remaining coverage](media-review/remaining-coverage.json) distinguish current assets from deferred account/device states. No invitations, campaign emails, SMS, recovery messages, payments, or real attendee orders have been sent or placed for the refresh. Temporary Spanish communication overrides were reset and the original multilingual switch was restored after capture.

## Ahrefs SEO follow-up

The October 1 follow-up reviewed 96 distinct seed keywords, four matching-term searches, eight organic SERP snapshots, and current Ahrefs rankings for the docs and main domain. It refined 20 guides, retained stable URLs and concise sidebar labels, added practical email/question examples, and strengthened related-workflow links. See [SEO review](SEO_REVIEW.md) for keyword ownership, estimates, exclusions, and the saved research. Product support coverage remains independent of search volume.

## Coverage and changes

| Area | Coverage in this review | Customer entry point |
|---|---|---|
| Event editor | Checklist across every editor area; parent/date scope; conditional steps; moved display controls; cancellation scope and refund distinction. | [Event options](event-management/event-options-reference.mdx) |
| Tickets | Main editor's tabs; pricing, service fees, access, membership rules, required tickets, capacity, sales, admission, Autopilot, seating; separate custom-day fee controls. | [Ticket options](event-management/ticket-options-reference.mdx) |
| Dates | Shared/custom tickets, copy/start-empty choices, reverting to shared tickets, title/capacity/waitlist inheritance, booking labels, and whole-event passes. | [Day-specific tickets](event-management/day-specific-tickets.mdx) |
| Waitlist | All settings, fixed-capacity thresholds including zero, communications, queue outcomes, restriction/quantity fields, page-link and private-invoice paths, limits, expiration and capacity exceptions. | [Waitlists](event-management/waitlist.mdx) |
| Widget | **503 indexed controls**, each represented once in seven source-synchronized option references; updated setup, search, prerequisites, and saving instructions. | [Widget overview](branding-and-design/widget-customization-overview.mdx) |
| Quick Settings | Every card/control, where its full settings live, shared values, appearance summary, search and breadcrumbs. | [Quick Settings](branding-and-design/quick-settings.mdx) |
| Shared design | Existing event/site/ticket/email/completion/kiosk/POS design reference checked against **307 statically keyed controls** in the current source; missing membership-PDF controls added. Brand identity, custom PDF, attendee-page and common email controls also have existing dedicated coverage. | [Design reference](branding-and-design/design-options-reference.mdx) |
| Languages and locale | Widget automatic translation, top-right preview language, custom label behavior, communication defaults and overrides, retained translations, campaign variants, fallback, dates/timezones, and common questions. | [Language and locale](branding-and-design/language-and-locale.mdx) · [FAQ](getting-started/language-and-locale-faq.mdx) |
| Registration questions | All response types, editable dropdown choices, checkout versus check-in requirements, mapping, waitlist exclusion, per-ticket applicability and per-attendee collection. | [Questions](event-management/additional-information.mdx) |
| Shopify | Block setting and default, inline/modal, product-template placement, product controls, distinction among four blocks and the legacy embed, checkout handoff and verification. | [Ticket Selector](plugins/shopify-ticket-selector.mdx) |
| Seating | Category-to-ticket pricing, multiple prices for one category, holds, mobile expansion, occurrence inheritance/replacement, quota, individual/order assignment, displacement and remaining attendees. | [Seat selection](seating-charts/seat-selection.mdx) |
| Wider product | All **111 named features** in the current plan inventory remain represented in the existing feature reference, with guides for memberships, add-ons, analytics, attendee management/portal, integrations, account/team, marketplace, mobile, printing, kiosk, and POS. | [Feature reference](account/feature-reference.mdx) |

The 503 widget controls comprise 167 design controls, 75 display controls, 11 layout controls, 8 event-filter controls, 9 visitor-filter controls, 17 checkout controls, and 216 text controls. These counts represent indexed settings, not a count of every selectable value, dynamic field, or third-party seating-designer tool.

The broader feature check establishes documentation presence, not a fresh end-to-end verification of every integration, plan entitlement, mobile device, or printer. The existing feature inventory also does not name every new UI control; it is complemented by the detailed option references.

## Product mismatches discovered

These findings were documented without modifying application code.

| Priority | Finding and consequence | Source evidence | Documentation treatment |
|---|---|---|---|
| High | The day-ticket control **Stop check-in after a while / Until** writes the delayed-opening fields. It actually prevents check-in until after the event starts, reversing the meaning of “stop”. **Limit how long entry stays valid** writes the late-cutoff fields. | Dashboard `src/redesign/features/Tickets/components/TicketEditor.tsx` around lines 512–570; server `routes/api/dashboard/attendees/controller.js`, `calculateTicketValidity`, delayed-opening check around lines 355–445. | Explicit label mismatch in the ticket reference; direct organizers to review the main editor's opening/closing fields and test scans. Recommend correcting the day-editor labels. |
| Medium | **Expiration Time (hours)** is editable in waitlist communication, but manual invitation creation supplies `ttlHours: 48`. A custom promise in the email can disagree with the access link. | Dashboard `src/modules/events/waitlist.tsx` notification settings; server `routes/api/dashboard/events/controller.js`, `queueWaitlistNotifications`, around lines 325–332. | State the current 48-hour invitation behavior. Recommend connecting the saved setting to token creation or removing the misleading control. |
| Medium | **Private Shopify Invoice** is offered even for a fixed-capacity waitlist, but the access handler creates legacy draft orders only when fixed-capacity mode is off; fixed-capacity access goes through the event/product checkout. | Dashboard `src/modules/events/NotifyWaitlistModal.tsx`; server `routes/api/dashboard/events/controller.js`, `handleWaitlistAccess`, condition around line 10580 and fixed-access redirect around line 10668. | Explain both paths and the capacity exception. Recommend adapting the chooser's label/help or availability to the selected mode. |

The widget Text → Event details help text says values cannot be changed while automatic translation is enabled. The current fields remain editable, and the widget preserves custom wording while translating recognized defaults. The new locale guide and FAQ explain the observed behavior; the product help text should be aligned with it.

The Shopify selector checkout was inspected in a local development checkout. Its deployed configuration and a real storefront order were not verified here.

## Initial structural and rendering review

- Added 14 public guides and updated 24 existing articles, plus navigation and maintenance checks.
- Compiled all **108 MDX pages** and checked **1,014 local links/media references**; Mintlify reports no broken links.
- Opened all **108 routes** in the local Mintlify preview: every route returned HTTP 200 with its expected page heading and no captured JavaScript page errors. Visually reviewed desktop and mobile examples; the mobile waitlist page had no horizontal overflow.
- Verified all **14 internal section links** against rendered heading IDs, including the checkout/payment reference anchor.
- Every public MDX page is included in navigation and has a title and unique description.
- Generated reference coverage is checked against all 503 source keys, with no omitted or duplicated keys.
- All 111 plan-feature names are present in the feature reference.
- Fixed an existing attendee-management link that pointed at the attendee-portal directory instead of an article.
- Replaced obsolete widget dropdown/paintbrush instructions with Quick Settings, All Settings, search, and breadcrumbs.
- Removed documentation of event-level host/attendee switches that are commented out in the current event editor; linked the shared Design controls instead.
- Preserved existing guide URLs. Older screenshots retained elsewhere can still show previous labels; new/reworked instructions use current labels and identify relevant differences.

Validation commands and reference-refresh instructions are in [README](README.md). Compilation and link checks do not establish accuracy of external videos, third-party documentation, or external service availability.

## Evidence used

All paths below are relative to their respective repository roots and refer to the working checkout reviewed on 1 October 2026.

- **eventviewer-dashboard:** `src/modules/settings/search/settings-index.generated.json`, `search/metadata.ts`, settings category registry and panel/quick settings, display/layout/filter/checkout/text/design components, `src/modules/sites/plan-feature-list.json`.
- **eventviewer-dashboard:** event details/date/ticket/waitlist/question/display components; day drawer and day-ticket section; ticket tabs, main and day ticket editors; communication language components; Design/Site Settings; cancellation modal; seating assignment/review components.
- **wix-eventviewer-server:** waitlist capacity and inheritance, notification request validation/queuing, invitation access and Shopify draft-order handling, attendee check-in timing rules.
- **wix-eventviewer-client:** seating renderer and checkout waitlist handling, including date-specific selection, multiple ticket choices per category and seating quota behavior.
- **shopify-app-extension:** Ticket Selector, Event Widget and Additional Questions Liquid schemas; selector checkout handoff and shared expanded seating view.

## Remaining authenticated acceptance checks

These are the remaining checks needed before claiming that every documented workflow has been exercised in the live product:

1. Complete the dependency-limited capture briefs and retained legacy-media review listed in [remaining coverage](media-review/remaining-coverage.json). The logged-in event editor, all six main ticket tabs, all ten custom-day sections, and 503 widget settings have been reviewed; conditional plan/account states remain separately tracked.
2. Complete buyer waitlist, invitation-expiration, and private/Shopify-invoice previews without sending invitations. Delivered-message checks require an authorized test recipient.
3. Verify the Shopify storefront template, inline/modal selector, per-attendee questions, required tickets, memberships, two occurrences, and completed checkout when the deferred external Demo account is available.
4. Finish unavailable/held-by-another-checkout seating states and a genuine exhausted-allowance fixture. Buyer selection, per-seat price choices, mobile expansion/return, custom-date inheritance, whole-table controls, actual order assignment, and canceled reassignment-conflict previews are now verified.
5. Verify Stripe installment setup and paid-order actions when a Stripe test connection is available. The current Demo connection is Square.
6. Deliver sample multilingual emails/tickets only when sending is authorized; complete the remaining saved-waiver/check-in-required-response fixture. Recheck the Spanish campaign-save error after backend work.
7. Verify the day-ticket timing mismatch after the product labels are corrected and refresh the affected screenshots.
8. Complete all six Analytics tabs last. Use temporary demo API responses only for Analytics, then remove them and verify normal API operation.

The remaining checks should use synthetic events and attendees. No attendee messages, invitations, payments, or buyer checkout registrations have been submitted. The five manually added synthetic attendees and two saved seat assignments are recorded below.

## Media refresh validation

The updated locale guide, FAQ, and multilingual guide render without horizontal overflow on mobile. Both language and widget-tour GIFs use `noZoom` inside `<picture>` so Mintlify preserves the direct image child and the reduced-motion poster can be selected. The language example has been checked with reduced motion enabled. Current assets are progressively inserted into the guides; older statistics above describe the initial source audit. Run `scripts/update-media-progress.py` for current asset and guide counts.

### Live capture follow-up: event email translations

On October 1, saving a valid Spanish subject/body override for the Demo event returned **Internal Server Error** after an earlier validation rejection for an added template variable. Reloading confirmed no override persisted. The original-content and editable-override screens are captured; successful campaign save and Reset language still need a live recheck after concurrent backend work. The guide distinguishes editing status from successful persistence. No messages were sent.

### Membership and waitlist navigation verified live

Membership event assignments now expose checkout availability, access, direct admission versus required reservation, per-member limits, and default/custom check-in windows. These are documented in the assignment guide. The Waitlist Communications tab remains commented out in the dashboard; the guide now points to Design → Attendee Communication rather than this unavailable tab.

### Live seating follow-up (October 1)

Created the separate **Demo Theater** chart from Theater 1, categorized all 1,014 seats, named Main floor/Balcony, and published it. Assigned it to the existing zero-attendee `test` event and mapped its Standard ticket. No attendee emails were sent. Chart/category snapshots come from the embedded live designer.

Current source and live UI replace the old manual “Apply Chart to All Dates” instruction with automatic series inheritance and **Retry seating setup**. Added documentation for the chart replacement preview, category mapping, credit usage, booking then activation, open sales/new-booking caveat, and chart history. The live replacement preview rejects Club 3 because whole-table/general-admission layouts require separate handling. This restriction belongs in the guide.

### Registration and promo live checks

Quick Add inserts a preset directly into the unsaved event form; it does not first open an editor. Updated the guide to use the row's pencil before saving. The demonstration waiver was discarded by reloading, and no question changes persisted. Added screenshots for dropdown options, checkout/check-in requirements, ticket scope and waiver formats.

Created the local Demo promo **DEMO10** on Sunset Yoga (10%, Standard ticket, 100-ticket limit, October 2 09:00 through October 8 16:00; Shopify sync off, multi-event off, volume rule off). Reloading and opening its editor confirmed the saved values. The table's **Starts** cell currently displays the event's start instead of the promo's scheduled start (`getStartDate` in `promo-code-table.tsx` uses `event.dateStart`); use the editor for schedule verification and track this as a product follow-up. No customer tag was added and no Shopify synchronization was triggered.

### Event content and host invitations verified (October 1)

Refreshed the checkout-complete message, event host roles, tracking-link form/list, and Shopify promo-tag mapping. Corrected checkout personalization examples to copy the full `{{event_title}}` token and paste it into the message. The custom-field editor stores organizer-entered event data; attendee answers belong in Additional Info.

The host form's **Add Host** action sends an invitation and creates a pending invitation, even though the UI toast calls it “added.” The guide now explains acceptance before Active Members, resend/delete actions, and the owner's removal restriction. The capture stopped before submitting the invitation. Server evidence: `routes/api/dashboard/events/hosts-controller.js`, `addEventHost`, creates a pending record and calls `sendHostInvitationEmail`.

Created the **Demo newsletter** tracking link for Sunset Yoga using its event-page URL. It has zero activity and has not been shared.

### Account, installation, and site settings verified (October 1)

Corrected widget creation to Editing Widget → Create new widget and Any Website installation to its two required snippets. Captured dashboard-side WordPress and Lovable instructions; external editor/result checks remain deferred.

Account profile now contains first/last name, bio, social links, website, and avatar. Password validation requires more than eight characters and email-code verification. Notifications include a verified delivery address and Contact Messages from Customers. Personal values and provider merchant details are concealed; no password, notification, sender verification, API key, or payment connection was changed.

General site settings now cover Enable Cart, the 1–120 minute seat hold, SMS Country, and the shared Date Display/Time Display controls. The locale guide and FAQ link to Regional Settings. Domains & Sender Identity distinguishes reply-to verification from custom From-address/DNS verification. Added TikTok Pixel ID alongside Google Analytics and Meta Pixel.

Public Event Submissions was temporarily enabled only in the unsaved form to capture its URL and both message templates, then restored off. Domain and sender form examples were discarded; no DNS verification or email was triggered. Marketplace remains gated to Platform on this Business+ Demo.

Marketplace source exposes a third fee model, Ticket Booking Fee, with Booking Fee per Ticket. Added it to the option list. Live persistence still needs Platform verification: the dashboard sends `ticket_booking_fee`, while the current site model enum lists `fixed`, `tiered`, and `percentage`. Track this schema mismatch as a product follow-up rather than treating the screenshot queue as end-to-end verification.

### Workspaces, team roles, and capture restoration

Updated workspace creation to the current Workspace name → Continue flow and replaced the old Site URL form. The WordPress row in the connection chooser is currently noninteractive; its guide points to the separate installation steps. Team invitation screenshots and instructions now use Admin, Ticket Checker, Support Manager, and Event Manager. The Owner-only Demo has no role/remove menu or pending invitations, so those action screenshots remain dependent on an existing non-owner demo member. No invitation was sent.

Reloading the widget after the visitor-filter demonstration confirmed all nine visitor filter switches restored off and desktop layout restored to Simple List. Captured settings were restored with successful API responses, then checked again after reload.

### Unused date-level advance-purchase control removed

At the user's request, removed **Ignore advance purchase window** from `day-ticket-section.tsx` and its unused styles. The checkbox only set component-local state: the value was neither loaded nor passed to ticket saving, day saving, or availability. The actual ticket-level Advance Purchase Window is unchanged. Retired the screenshot brief and removed the nonfunctional option from the day-ticket guide.

Created the hidden draft **Demo Workshop Series** (`999d50b5-ec68-43f3-8a97-6e4547745c36`) with October 15 and 22, 2026, 5–9 PM Pacific occurrences for date-drawer captures. No publishing, tickets sold, or attendee messages.

Removal validation: targeted ESLint passed, and the live day drawer reloaded without the unused checkbox. The repository-wide TypeScript check reports existing errors across unrelated modules; no diagnostic names `day-ticket-section.tsx`. The cleanup is local and uncommitted on `codex/documentation-unused-day-override`.

Date-drawer persistence checks: copied the Standard ticket into the October 15 demo occurrence, discarded unsaved ticket/fee/access/timing examples, and restored Use event tickets. A full reload verified shared tickets, all three date overrides off, and an empty booking label. The copied custom ticket remains stored but inactive, as the UI explains.

### Attendee dashboard refresh (October 1)

Replaced the four attendee guides and their obsolete screenshots with current financial cards, combined name/email search, event/ticket/status filters, More filters, question-answer filters, detail/contact/notes/email views, order details, status choices, bulk actions, printing, exports, and manual registration. Corrected manual registration's status and notification controls, occurrence requirement, group-ticket allowance, and 365-unit form ceiling. Bulk status changes are capped at 200 attendees.

Export behavior was checked against dashboard and server handlers. Selected rows take precedence; otherwise Export all attendees ignores filters, and switching it off uses current filters. Include location adds tracked city/region/country, not check-in stations. Check-in and financial reports ignore row selection/attendee filters. The check-in handler uses the exact open event; it does not expand a series parent. The attendee CSV downloaded successfully with HTTP 200 and one existing attendee row; no export content containing identities was added to the documentation.

No attendee was added, edited, deleted, refunded, checked in, moved, or notified in this pass. Existing contact details, author email, and order number are masked in captures. The narrow attendee sidebar currently clips part of its tab strip even at a wide viewport; this is a product layout follow-up, not a claim that the SMS feature is missing.

Validation: all 110 MDX pages compiled, all local link/media references passed, and the four refreshed attendee guides returned HTTP 200 with no broken images, browser errors, or horizontal page overflow at desktop and 390px mobile widths. Seating assignment, paid installment records, delivered waiver/required-check-in responses, and completed transfer/refund results remain separate live acceptance checks.

All three CSV downloads now verified with HTTP 200: attendee export (1 data row), financial report (7 order rows), and check-in activity (empty, matching no recorded check-ins). The check-in and financial requests contain only event_id. No payment or message was initiated.


### Seating and date-override acceptance (October 1)

Created five free synthetic Standard attendees in the existing **test** Demo event with order notifications explicitly off: two Taylor Demo attendees and three Jordan Demo attendees. Successfully assigned Taylor's two attendees to Demo Theater seats Patio de butacas-1-17 and Patio de butacas-1-19. The assignment API returned HTTP 200 with assigned_count 2 and displaced_count 0; the live summary updated to 1,014 seats, 2 booked, and 1,012 available.

Captured the order search, review, saved result, assigned-seat detail, unbook confirmation, and individual reassignment confirmation. The unbook and move examples were canceled. A separate Jordan order review demonstrates both a remaining unseated attendee and a conflict that would unseat Taylor; that preview was canceled too. Jordan's three attendees remain unseated. No messages, payments, refunds, or real attendee changes were made in this seating pass.

Assigned Demo Theater and the Standard category to the hidden draft Demo Workshop Series to verify automatic occurrence inheritance. Temporarily made the first date's chart choice custom, then restored Uses event seating. Captured both states. Replaced the two clipped capacity/waitlist/title/booking-label crops; Discard followed by reopening confirmed all three overrides off and the booking label empty.

The attendee table briefly displayed "Showing 2 of 0 attendees" after manual creation despite rendering both records; the seating summary and saved assignments were correct. Track the table's total-count refresh separately from documentation coverage.

The day ticket editor's conditional Seating section was captured against the actual inherited Demo Theater chart. The category checkbox example was discarded. Returning to shared tickets succeeded on the server, but the open drawer temporarily retained "Using custom tickets"; closing and reopening showed "Using event tickets" and inherited fields. Keep this stale open-drawer summary as a product follow-up. Final date defaults remain inherited and the booking label is blank.


### Latest requested coverage

| Requested area | Documentation and live evidence | Remaining acceptance/captures |
| --- | --- | --- |
| Attendee dashboard | Six financial cards; combined search; occurrence, ticket, status and More filters; question-answer filters; list/detail/order/bulk/manual-add screens. | A saved waiver/required-check-in-answer example and completed transfer/refund results remain separate checks. |
| Exports | All three export requests returned HTTP 200. Documented selection/filter precedence, fields, and the exact-event scope of check-in reports. | A populated check-in CSV needs recorded Demo check-ins. |
| Seating administration | Actual two-seat order assignment; counts; individual assignment; unbook/move confirmations; conflict and remaining-attendee review; series/date inheritance. | Buyer seat selection, multiple prices for one seat, mobile expansion/return, and cleared test selections verified with the existing Demo Theater. Whole-table controls captured from an existing published Club table. Quota-exhaustion acceptance remains tracked separately. No extra theater chart is needed. |
| New ticket options | All six main-editor tabs, event-level options, saved-ticket actions, and all ten day-ticket sections are covered. | Marketplace processing-fee controls require the appropriate plan/site; Stripe-dependent fields require Stripe test access. |
| Date overrides | Ticket-source copy/start/revert, capacity, waitlist threshold, title, booking label, seating categories, Save and Discard. | Reopen after a ticket-source change to verify the effective source if the open drawer summary is stale. |
| Cart | Both site-wide settings entry points, Add to Cart/return/payment flow, session lifetime, compatibility and combined-checkout limits. | Live Add to Cart, confirmation, and final-review screenshots captured. A two-ticket quote returned HTTP 200; no registration was submitted. Cart was restored to its original off setting and a reload cleared the browsing cart. |
| Installments | Setup, purchase-relative schedule, manual collection, authentication/replacement-card link, release/approval caveats, styling and email templates. | Enabled schedule, buyer agreement/summary and paid-order management screenshots need Stripe test connection; Square alone is insufficient. |

Analytics remains last in the production queue. External-service/device captures remain deferred as requested. No Analytics fixtures have been installed.


### Buyer seating and Cart acceptance (October 1)

Captured the live buyer map, floor navigation, selected-seat popover, ticket/seat summary, and 390px expanded map. Deselecting the test seat removed its summary before resizing or leaving checkout. Updated the hidden draft Demo Workshop Series to Standard $20 and a new Child $10 ticket, both mapped to the Standard category, to verify the real per-seat price selector. Choosing Child changed the summary and total to $10. Deselecting again cleared the selection; no order or payment was submitted. The series remains a draft.

The Cart guide now includes Add to Cart, the added confirmation, and the final review with two free tickets. Quotes returned HTTP 200. Reloading cleared the browsing cart; the site Cart setting was restored to its recorded original false value and verified again. No registration was submitted.

Seating allowance exhaustion is documented from source but still requires a genuine depleted Demo fixture for its screenshot. Temporary fake data remains authorized for Analytics only; none has been introduced elsewhere.

Plan-gating follow-up: the seating designer's Business feature list includes `referenceChart`, `backgroundImage`, and `booths`, while the visible upgrade comparison markets venue uploads and booth seating as Business+ features. The published plan matrix is left aligned with the visible product comparison pending a Business-account entitlement check. Whole-table booking and multi-floor/multi-zone features are explicitly enabled for Business+.

Whole-table controls were captured read-only from the existing published Club 3 chart: table REG25 already uses Book by table and has five chairs. Added the exact Category, Table labeling, Book by seat, and Book by table instructions. No change to this chart was saved or published.


### Event-action and export scope follow-up

The event-card More actions menu now exposes direct attendee/check-in/financial exports, duplication options (including the seating chart), Share, messaging, and Analytics. Added the card export route to the export guide: it resolves the next occurrence for a series and falls back to the series on an empty/failed lookup. It does not reuse attendee-page filters. The date-card caption can say all time slots, but check-in export resolves only the supplied event ID, and financial export expands only a series parent. Open a particular slot for those reports until the scope mismatch is resolved.

Replaced the old Manage Events instructions. Save preserves the current status; platform publishing and Change to Live are distinct. The series menu's Cancel all Events still opens a dialog with Specific date or time and All upcoming dates and times. Notifications default on, with a separate final confirmation. The delete confirmation says it removes all associated data, but the handler marks events deleted/cancelled, archives a linked Shopify product, and queues attendee status changes; the guide no longer promises erasure of all associated records.

### Event lifecycle verification — 2026-10-02

- Cancelled one empty Draft occurrence of Demo Workshop Series with Notify Attendees off: API 200, zero attendees, zero recipients, notification status disabled.
- Restored that occurrence to Draft and verified its status after a reload. No emails, refunds, or deletion were performed.
- Captured the actual Restore as Draft menu and Delete Event confirmation, then closed deletion with Back.

### Membership holders and checkout verification — 2026-10-02

- Replaced outdated Purchased / Resend QR terminology with Member Since / Send Membership Pass. Documented all four overview cards, list columns, search/status, pagination, member source/usage/pass actions, exact extension choices, cancellation, and CSV fields.
- Verified manual synthetic member creation (201), PDF download (200; one A4 page visually inspected), and CSV download (200). Search with no results still exported one member: export applies status but ignores search.
- Casey Demo / DEMO-001000 is a retained synthetic holder of Demo Yoga Pass. No pass email, extension, cancellation, or payment was sent/performed.
- Created Member Workshop in the hidden Draft Demo Workshop Series: public $25, member $15. Verified invalid number, valid number, and two-ticket $40 total. Cleared verification and reloaded without placing an order.
- Product follow-up: member checkout's Ticket summary line shows $50 before its discount while the final total shows $40. The detailed member/public breakdown above is accurate; consider labeling the summary's gross amount.

### Waitlist subscriber and invitation review — 2026-10-02

- Created Morgan Demo with one free Standard waitlist entry in the existing Demo event test, with notification email disabled. Verified the saved attendee and subscriber after reloading; did not send an invitation or create an invoice.
- Captured the populated subscriber list, event-page invitation form, and private-invoice form. Shared the already reviewed current communication-template captures with the waitlist brief.
- Product issue: the invitation dialog's ticket selector is empty despite a saved Standard ticket. `NotifyWaitlistModal.tsx` accepts only an array from `getEventTicketsApi`, but the current `/dashboard/tickets/events/:id` handler returns `{ tickets, features, capacity }`. This blocks selecting a ticket for private invoices and ticket-restricted invitations. Documented the observed limitation; no product code changed for this issue.

- Product follow-up: turning Enable Waitlist off before changing capacity to unlimited can leave `waitlistStartAfter=0` hidden in form state. Save then returns 500 from fixed-capacity validation. Reopening the enabled Waitlist settings with unlimited capacity clears the threshold; disabling Waitlist again and saving returns 200. The guide now tells users to clear the fixed-capacity switch before returning to unlimited capacity.

### Waiver response capture dependency

Created an explicitly non-binding Demo participation agreement on the ended `test` event (synthetic attendees only), required at check-in and optional at checkout. The organizer session cannot access Taylor Demo’s order through the attendee portal: the endpoint scopes records to the signed-in attendee email. Saved-acceptance screenshot remains TODO for an attendee session. No signature was submitted and no notification sent. Updated the guide from the implemented attendee-details flow.

### Ticket designer refresh

Verified the live Business Plus custom Ticket PDF editor, A4 and Standard Badge tabs, text content/font controls, tokens, QR placement, and Remove Format confirmation. Updated three design guides to remove obsolete Shapes, free-positioned Images, arbitrary Width/Height, and non-rendered text controls. Basic mode was restored after capture; no canvas changes were saved. Restoration proof: `/tmp/ticketspot-custom-designer-restoration.json`. The token-menu crop was recaptured with fewer circles, visually reviewed, and placed in the guides.

### Public result checks

Captured the real Sunset Yoga hosted event on desktop and 390px mobile. Design → Site has no `site_preview_url` in this Demo configuration and shows No preview URL available; its public organizer link is the external Shopify storefront. Hosted-site responsive result remains TODO; removed the obsolete result GIF rather than representing it as current. Actual two-page A4 ticket output verified with distinct assigned seats and QR codes.

### Analytics final batch and restoration

Rebuilt Overview, Sales, Attendance, Traffic, and Abandoned Carts, and added the missing Email guide. The six guides contain 34 current screenshots. Coverage includes every report tab; event/occurrence, range and interval controls; metric definitions; chart and table controls; repeat scans; ticket-type comparisons; visitor geography; recovery composition; message-type and status filters; failed emails; scheduled reminders; and Force Run/Force Send confirmations. All sending confirmations were canceled. Captions identify the illustrative data.

Temporary GET response fixtures existed only in the dedicated browser page. They were removed, then the page was fully reloaded. The real Overview API returned HTTP 200 with zero sales, sold tickets, and attendance for the Demo series; the fixture interception count did not increase. No Analytics source file or stored record was changed. [Restoration and export evidence](media-review/production/analytics-acceptance.json).

Additional verified findings:

- Attendance's top Export CSV returns summary JSON even with `export=true`. The guide documents the issue and points to attendee-management check-in export.
- Sales export returned valid CSV with five attendee rows. Order-level totals repeat on ticket rows, so the guide warns against summing those repeated values.
- Traffic, abandoned-cart, and email real exports returned empty arrays; populated export contents were not verified.
- Overview conversion uses tickets sold / views; Traffic uses tracked conversions with different denominators. Email's Open Rate card and funnel also use different denominators. The guides explain these differences.
- Attendance table filters apply only to the loaded page. Email CSV does not apply activity search/status filters. The guides describe each export's actual scope.
- The custom-date panel can initially show Custom without its date fields after switching tabs. Selecting another preset and then Custom reveals them; product follow-up: synchronize `showCustomDates` with `timeRangePreset`.

### Final verification and remaining work

All 112 MDX pages compile; 112 navigation entries and 1,274 local link/media references pass. All 112 pages render with HTTP 200 on desktop and at 390px mobile width, without broken images, browser page errors, or horizontal overflow. The widget reference still accounts for all 503 indexed settings. The library contains 516 reviewed screenshots, 3 reviewed GIFs, and 3 companion posters, placed across 94 guides. Sixteen alternative current close-ups remain available in the gallery without redundant placements.

The remaining 11 Demo-only capture briefs require Stripe test payments, an attendee login, a Platform account/organization/review state, an accepted host/non-owner teammate, a genuine exhausted seating allowance, or a configured hosted-site preview. Seventy external/device briefs remain deferred, thirteen with current Ticket Spot setup screenshots already captured. Existing legacy media now remains only in those integration, portal, and mobile/device areas. Five embedded long videos still need separate freshness review. These are explicit follow-ups, not a claim of complete live acceptance for every product workflow. [Detailed TODOs](media-review/EXTERNAL_TODO.md).

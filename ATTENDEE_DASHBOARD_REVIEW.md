# Attendee Dashboard action review

Reviewed October 2, 2026 against the current dashboard and server source, the user's three menu/drawer screenshots, and the authenticated Ticket Spot Demo browser.

## What changed

The earlier guides covered list filters and the attendee drawer, but only mentioned refunds, transfers, and ticket changes. The navigation now calls this section **Attendee Dashboard**. Four focused guides cover orders, refunds/cancellations, transfers/ticket changes, and email/SMS delivery. The existing dashboard and attendee-detail guides now link to each workflow and explain their own controls more fully.

| Surface | Documented actions and information | Guide |
| --- | --- | --- |
| Attendee list | Statistics, Re-calculate Totals, search/occurrence/ticket/status/answer/more filters, load more, selection scope | `attendee-management/managing-attendees.mdx` |
| Row menu | View Attendee, conditional View Order, Print A4, Print Badge/Design Badge, ticket design link, Remove confirmation | `attendee-management/managing-attendees.mdx` |
| Status and bulk actions | Single and bulk status, notification choices, pending approval, Send Tickets, Delete, Refund, Notify Waitlist Guests | Dashboard guide plus refunds/delivery guides and existing waitlist guide |
| Attendee header/contact | Activity Log and return control, View Order, conditional View Shopify Order, contact/seat-label Edit/Save/Cancel, role restrictions | `attendee-management/viewing-attendee-details.mdx` |
| Questions | Edit/Save/Cancel, empty responses, ordinary answers versus read-only waiver evidence, View Content/Link/Document | Attendee-detail guide plus existing waiver guide |
| Notes | Add Note, required draft, Save, Cancel/close behavior, saved author/time, no edit/delete controls | Attendee-detail guide |
| Email/SMS | Every row status, first-send/delivery/open/failure fields, timeline, email Resend confirmation, no SMS resend control | `attendee-management/email-and-sms-delivery.mdx` |
| Order header | Event/occurrence formats, reference, purchase date, totals, discounts/promo codes, tax/refund/dispute amounts | `attendee-management/managing-orders.mdx` |
| Order controls | Activity Log, Shopify link, View Event, Email Tickets recipient scope, cancellation/refund, transfer | Order guide plus focused action guides |
| Order attendee cards | Person shortcut, ticket/price/indicator, Change Ticket Type, preserved order cost, group-ticket constraints | Order and transfer guides |
| Conditional order details | Add-on attendee/title/main-event links, unassigned legacy add-ons, included/paid price; group badge; installment schedule/balance/statuses | Order guide plus existing installment guide |
| Refund dialog | Shopify selection, already-refunded exclusions, total, refund checkbox, restock option, required reason, cancellation-only scope | `attendee-management/refunds-and-cancellations.mdx` |
| Bulk refunds | 1–200 tickets, supported providers/currencies, verified amounts, exact-count confirmation, reason, expiry, exclusions, all result statuses and interrupted-job recovery | Refund guide |
| Transfer dialog | Same-site live destination, date/time occurrence requirement, every attendee's ticket mapping, reason, email default, confirmation, partial outcomes, price/seating/Shopify caveats | `attendee-management/transfers-and-ticket-changes.mdx` |
| Related tools | Manual attendees, seating assignment, announcement creation, scanning, exports | Linked existing guides; announcement form and images linked from delivery guide |

## Evidence

- Dashboard: `src/redesign/pages/AttendeesPage/index.tsx` and its status, bulk, communication, printing, rollup, and installment components.
- Drawers: `src/redesign/features/AttendeesSidebar/`, including tabs, activity view, order cards, add-on cards, and `AdminTransferModal`.
- Reused actions: `src/modules/attendees/cancel-and-refund-modal.tsx`, `attendee-ticket-edit-modal.tsx`, and `order-view.tsx`.
- Server: `routes/api/dashboard/orders/controller.js`, `orders/bulk-refund/`, `routes/api/attendees/transfer-utils.js`, and the attendee ticket-update handler. This verifies cancellation scope, bulk eligibility, price preservation, and the absence of automatic Shopify variant replacement.
- SEO: `seo/attendee-actions-2026-10-02.json` contains all 11 Ahrefs results, estimated US/global volumes, unknown metrics, and editorial choices. Queries with unrelated cinema intent were not used to redirect the documentation's purpose.

## Capture and verification boundaries

New captures use actual Demo records and the approved purple circles. Browser chrome/URL is excluded; names, email addresses, authors, and order references are concealed where visible. One clearly labeled documentation note was saved to the Demo attendee. The bulk refund preview was opened and canceled; previewing does not issue a refund. Contact/answer/ticket changes, removal, order cancellation/refund, transfer, and outgoing confirmation submissions were not executed for screenshots. No response fixtures or product source edits were used.

Static close-ups were chosen so users can read confirmation text, options, and scope at their own pace. Existing reviewed contact-edit, print, bulk-status, bulk-send, announcement, seating, and export images are reused where current.

Additional conditional visual examples remain explicitly pending: an order with linked/unlinked add-ons or group tickets, a future recurring transfer destination, a signed attendee waiver, a populated SMS delivery/failure history, installment order details, and completed/uncertain refund outcomes. Their instructions are source-verified; the current screenshots do not claim to demonstrate those outcomes. Existing external Shopify admin and payment-provider screenshot deferrals remain in `media-review/EXTERNAL_TODO.md`. Do not issue live messages or financial transactions just to manufacture these states.

Validation results are recorded in `media-review/production/attendee-actions-acceptance.json` after final image review and desktop/mobile rendering.

Checks ran in the shared documentation workspace. Pre-existing unrelated starter-file deletions and edits are excluded from this change; the page totals describe that workspace, not a separate clean checkout.

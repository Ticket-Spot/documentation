# Documentation SEO review — October 1, 2026

This pass uses the connected Ahrefs plugin, not inferred keyword volumes. It refines 20 existing guides and preserves every guide URL. Product instructions, option references, and low-volume support topics remain part of the documentation regardless of search demand.

## Research and limits

- Market: United States, with global search volume for comparison. Review date uses America/Los_Angeles.
- Queried 96 distinct seed keywords; Ahrefs returned 76. The 20 omitted keywords are recorded as unavailable, not zero.
- Ran four matching-term searches and inspected eight organic SERP snapshots. Broad searches returned unrelated parking-fine, support-ticket, and web-analytics terms; those were excluded from the content strategy.
- Queried organic rankings for both `docs.ticketspotapp.com` and `ticketspotapp.com`, including subdomains, as of October 1. The requested limit was 50 rows per target; Ahrefs returned four docs keywords and nine across the main domain and subdomains. This is Ahrefs' observed coverage, not a complete inventory of searches or proof that other pages are unindexed.
- [Saved Ahrefs requests and results](seo/ahrefs-2026-10-01.json) include parameters, metrics, missing seeds, SERP URLs, and source update dates. No subscription details or credentials are included.

Keyword Explorer volume is an estimated monthly average over the latest known 12 months. Site Explorer's volume describes the latest month, so the two can differ. Global volume is not a second estimate of US demand. Keyword difficulty (KD) runs from 0–100; missing KD is unknown, not easy. Traffic potential describes all-keyword traffic to the current leading page, not expected Ticket Spot traffic. These estimates inform page wording; they do not establish a uniquely “best” keyword or guarantee rankings.

## Existing rankings to protect

| Query | Observed docs position | Ranking guide | Decision |
|---|---:|---|---|
| create an event online | 2 | [Create and update an event](event-management/create-event-overview.mdx) | Preserve its title, URL, and existing instructions. |
| ticket sales analytics | 8 | [Sales analytics](analytics/sales-analytics.mdx) | Add “ticket” to the title and opening, retaining the report content and URL. |
| ticketspot | 1 | [Viewing your tickets](attendee-portal/viewing-your-tickets.mdx) | Preserve the attendee task; the main domain also ranks for the brand. |
| spot ticket | 7 | [Platform overview](getting-started/platform-overview.mdx) | Clarify that this is Ticket Spot documentation, without targeting the ambiguous phrase. |

The main-domain query also returned `wix ticket sales` at position 9 for the existing Wix feature article. Keep that article's discovery role and the docs' installation role distinct; do not copy the blog into the setup guide. These snapshots are not evidence of a confirmed cannibalization problem.

## Keyword ownership and applied changes

Volumes below are Keyword Explorer US / global monthly estimates. `—` means unavailable. A query appearing here is a relevant topic, not a claim that a support guide should outrank every commercial result.

| Topic or query | US / global | KD | Guide and decision |
|---|---:|---:|---|
| sell tickets on shopify | 40 / 40 | 1 | [Shopify connection](plugins/connect-shopify.mdx): task-focused “How to sell event tickets on Shopify” title. The related matching term `sell event tickets on shopify` has 50 / 50; SERPs contain both how-to and app results. |
| shopify event tickets | 50 / 70 | 11 | Same connection guide owns installation and publishing. [Ticket Selector](plugins/shopify-ticket-selector.mdx) retains its precise component title and detailed options. Its exact seed had no returned row. |
| wix event tickets | 10 / 20 | — | [Wix connection](plugins/connect-wix.mdx): describe event ticket setup with Ticket Spot, distinct from Wix's native product and the existing marketing article. |
| add event calendar to website | 150 / 150 | — | [Website embed](plugins/embed-on-your-website.mdx): clarify calendar and ticket embedding and link to the layout controls. |
| event calendar widget | 60 / 100 | 30 | Same embed guide owns installation; [widget layouts](branding-and-design/layout.mdx) owns appearance. Avoid another near-duplicate landing page. |
| ticket types | 100 / 250 | 1 | [Ticket setup](event-management/ticket-setup.mdx): identify event tickets, types, and pricing in the title and description. |
| recurring events | 100 / 200 | 0 | [Dates and times](event-management/datetime.mdx): identify recurring events and time slots. The query is broader than Ticket Spot, so keep the product setup context. |
| event registration questions | 80 / 90 | 0 | [Registration questions](event-management/additional-information.mdx): add event context and concrete question examples. The observed SERP is mixed and includes registration forms; this is a support relevance choice, not a clear ranking opportunity. |
| event registration form questions | 40 / 60 | 0 | Same questions guide owns form-field setup, with links to add-ons and attendee exports. Broad `event registration form` (1,000 / 2,200) often implies templates or builders; do not turn the guide into a generic form landing page. |
| event reminder email | 200 / 300 | 0 | [Email communication](event-management/email-communication.mdx): name reminder and confirmation emails, add a practical reminder example, and link to delivery analytics. SERPs include templates and how-to guides. |
| event confirmation email | 90 / 150 | 0 | Same email guide owns the workflow; [communication design](branding-and-design/attendee-communication-design.mdx) retains shared template styling. |
| event check in app | 500 / 1,600 | 0 | [Mobile app setup](mobile-app/mobile-app-overview.mdx): make the installation task explicit, rather than claiming to be a software comparison. |
| qr code event check in | 150 / 200 | 1 | [Mobile check-in](mobile-app/mobile-check-in.mdx): describe scanning and link to setup, attendance reports, and exports. SERPs include both guides and service pages. |
| ticket sales analytics | 200 / 350 | 0 | [Sales report](analytics/sales-analytics.mdx): strengthen the existing ranking with a specific title, description, and opening. |
| event attendance tracking | 200 / 500 | 0 | [Attendance report](analytics/check-in-analytics.mdx): explain unique attendance versus repeat scans and connect it to check-in. SERPs lean toward software selection; keep this a report guide. |
| event attendance report | 40 / 40 | — | Same Attendance guide owns interpretation; [attendee exports](attendee-management/export-attendees-and-check-in-data.mdx) remains the detailed export destination. |
| event seating chart | 250 / 500 | 16 | [Create a seating chart](seating-charts/create-and-assign.mdx): qualify the task with reserved seats. The observed results mostly offer chart makers, so do not promise a free standalone generator. |
| ticket payment plans | 10 / 10 | — | [Installments](event-management/installment-payments.mdx): clarify event-ticket payment plans and Stripe. Generic `ticket payment plan` results are dominated by fines; low volume does not remove this support requirement. |
| event waitlist | 0 / 0 | — | [Waitlists](event-management/waitlist.mdx): clearer event-specific title. Retain full coverage despite the zero estimate. `event software with waitlist management` (80 / 80) is a commercial topic, not the guide's primary target. |
| multilingual event registration | 20 / 20 | — | [Language and locale](branding-and-design/language-and-locale.mdx): clarify the description. Keep its title, [FAQ](getting-started/language-and-locale-faq.mdx), and [multilingual communications](branding-and-design/multilingual-communications.mdx) focused on their separate tasks. |
| ticketspot | 60 / 250 | 7 | [Documentation overview](getting-started/platform-overview.mdx): identify the docs and setup purpose while retaining a short sidebar label. |

The Analytics overview, Traffic, Abandoned Carts, and Email pages also receive explicit event-ticketing context in their titles/descriptions. This is an editorial disambiguation: exact-volume evidence for every report name was not available. Their content and screenshots retain the existing filters, definitions, and export limitations.

## Terms not used as documentation targets

- `event analytics` (800 US): observed results mix event-industry reporting with IBM operations analytics and Google Analytics. Use “event ticketing analytics” for clarity, without assigning that phrase an invented volume.
- `timed entry tickets` and `timed entry ticketing`: parent topics point to national-park reservations. Preserve the [timed-entry setup guide](event-management/timed-entry-and-passes.mdx) for its product task rather than optimizing for park visitors.
- `free event tickets` and `ticket transfer`: parent topics point toward consumer ticket offers and Ticketmaster transfers. Do not use their traffic potential as evidence for Ticket Spot setup demand.
- `zapier eventbrite`: describes another provider's integration. Keep Ticket Spot's integration guides product-specific.
- Broad `event ticketing software`, `sell event tickets online`, and `white label ticketing` are better candidates for the main site's feature pages or editorial content. No marketing pages were changed in this pass.
- Cart, locale overrides, ticket/day options, memberships, provider integrations, and every other support/reference workflow remain documented even when search data is absent. High volume does not take priority over accurate feature coverage.

## Technical SEO and validation

- All 112 guides have unique titles and descriptions. The existing documentation checker now rejects duplicate titles as well as descriptions, ignoring case and surrounding whitespace.
- Revised titles use `sidebarTitle` to preserve concise navigation. Existing URLs and heading anchors are preserved; new example sections add their own anchors.
- `docs.json` now describes the documentation's purpose and explicitly keeps indexing limited to navigable pages. No global keyword meta tag, forced canonical override, or duplicate FAQ schema was added.
- Before edits, the public robots file and sitemap returned HTTP 200. The sitemap contained 112 canonical docs URLs and no media-review pages. The live ticket-setup page had a correct self-referencing canonical and a unique description. These checks establish the deployed baseline, not deployment of this PR.
- Run `python3 scripts/check-documentation.py --dashboard /path/to/eventviewer-dashboard` and `node scripts/check-mdx.mjs`. Review rendered titles, descriptions, sidebar labels, links, and mobile layouts before publishing.
- Completed checks: 112 MDX pages compiled; 112 navigation entries, 1,281 local references, 503 widget controls, and 111 named plan features passed. All 20 changed guides returned HTTP 200 and rendered the expected title, H1, description, and sidebar label, with no browser errors or horizontal overflow at desktop and 390px mobile widths. Validation used the existing workspace; its unrelated uncommitted starter-file deletions are excluded from the SEO commits.
- After deployment, compare the changed pages' impressions, clicks, and queries in Search Console if available, and recheck Ahrefs rankings after recrawling. No Search Console performance data was used here and no recurring monitor was scheduled.

The implementation follows [Google's title guidance](https://developers.google.com/search/docs/appearance/title-link), [Mintlify's SEO settings](https://www.mintlify.com/docs/organize/settings-seo), and [Mintlify page metadata](https://www.mintlify.com/docs/organize/pages). Keyword selection combines the saved Ahrefs evidence with the actual task covered by each guide.

## October 2 Shopify Ticket Selector follow-up

Fresh US Ahrefs Keywords Explorer evidence is saved in [the Shopify keyword snapshot](seo/ahrefs-shopify-selector-2026-10-02.json). `shopify event tickets` returned 50 US / 70 global monthly searches (KD 11), and `sell tickets on shopify` returned 40 / 40 (KD 1). The connection guide keeps the broad selling/setup intent; the existing selector URL owns app-block installation, product templates, time slots, seats, and linked-product options. The new Shopify FAQ answers common support questions and links to those procedures.

`shopify event calendar` returned 60 / 70 (KD 12); explain the difference between a multi-event listing and a calendar for booking one event. `shopify booking app` and `shopify appointment booking` have broader app-selection intent and are not forced into headings about event time slots. `shopify seating chart` and `shopify shared inventory` returned zero estimates. `shopify time slots`, `shopify inventory across variants`, and `shopify ticket selector` returned no rows: their volume is unknown, not zero. All remain documented because customers need these workflows.

Keep the existing selector and connection URLs and established section anchors, including the pay-what-you-want section linked from What's New. Add the FAQ to navigation and link to it from both Shopify guides. Use exact UI labels in steps and descriptive image alt text; do not repeat keywords in every caption or add duplicate FAQ structured data.

The waitlist follow-up uses fresh Ahrefs US results: `shopify waitlist` has 150 US/global monthly searches (KD 0); `shopify waitlist app` has 50 US / 60 global. The FAQ now answers whether Shopify event tickets support waitlists and when they start, with links to the threshold screenshots and Ticket Selector setup. Keep the explanation specific to event tickets rather than general merchandise back-in-stock alerts. The metrics are saved in the same Shopify keyword snapshot.

## October 5 Shopify event add-ons follow-up

Fresh US Ahrefs evidence is saved in [the add-ons keyword snapshot](seo/ahrefs-shopify-addons-2026-10-05.json). `shopify event tickets` returned 50 US / 70 global monthly searches (KD 11); `shopify event registration` returned 50 / 70 (KD 4). `shopify ticketing` returned 10 / 50 with no KD. `event add ons` returned 0 / 10, and `shopify event add ons` returned no row, so its volume is unknown.

The [Shopify event add-ons guide](plugins/shopify-event-add-ons.mdx) owns the specific setup task: separate hidden events, publishing as Unlisted products, the first ticket, dates, quantities, capacity, and checkout. Its title and description use “Shopify event tickets” naturally without duplicating the connection guide's broad installation intent. The Shopify FAQ and Ticket Selector guide link to this procedure. Low or missing search volume does not remove the need to explain this workflow; unrelated merchandise upsell terms are not targets.

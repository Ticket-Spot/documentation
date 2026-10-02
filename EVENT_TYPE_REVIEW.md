# Event-type setup guides and Ahrefs review

Research began October 1, 2026 (America/Los_Angeles). The new “Set up your event type” navigation section contains an overview, one guide for each of the 21 named onboarding templates, and a Start from scratch guide: 23 new pages.

## Source coverage

[The coverage map](event-types/onboarding-map.json) records the 21 template IDs, labels, groups, starting values, and guide paths. Every guide has a matching `onboardingTemplate` frontmatter field. The documentation checker compares the map to the dashboard template source and verifies each page exists in navigation, so a new template cannot silently miss the docs.

Sources reviewed:

- Dashboard `src/redesign/features/Onboarding/templates.ts`, `types.ts`, `payload.ts`, and `dayTickets.ts`: all 21 templates, suggested capacities and prices, schedule choices, and the eligibility rules for day passes.
- Dashboard `src/redesign/pages/OnboardingPage/steps/{HostingStep,NameStep,WhenStep,AttendStep,ReadyStep}.tsx` and `index.tsx`: actual button/field wording, conditional questions, draft/creation routes, warning copy, and the Start from scratch handoff.
- Dashboard `src/redesign/pages/CreateEventPage/index.tsx`: full-editor section labels.
- Server `routes/api/dashboard/events/provisioning/{recipes,plan,steps,controller}.js`: actual day records, tickets, capacity defaults, publication rules, and plan warnings.
- Existing detailed guides: current ticket/day controls, forms, memberships, seating, installments, communications, locale, and checkout.

This was a source-grounded documentation pass. No new events, registrations, messages, payments, or screenshots were created for these guides. The previous capture Chrome endpoint was unavailable; the content does not claim a new live acceptance test of every template. The linked feature guides retain the existing reviewed media and their documented limitations.

Key distinctions documented:

- Template values are editable suggestions, not venue limits or recommended prices. Paid starting prices use the site's currency; RSVP ignores that paid price.
- Only Wine Tour and Bus Tour expose the time-slot question during onboarding. Other formats can use the full editor's time-based schedule.
- Festival and Conference create individual days by default. Retreat and generic Multi-day Event remain one span under their default full pass; choosing day passes creates the required day records.
- Full event pass is the initially selected option, even though Full event pass + day passes displays a recommendation badge. Day tickets initially copy the entered price/capacity.
- Onboarding day-pass choices exclude RSVP, assigned seating, and session-time selection. Removed dates mean no sale in day-only mode or a return to the shared pass in combined mode.
- Recurring dates are not membership access, ticket names are not assigned seating, and form answers do not allocate lodging, session, team, or vehicle inventory.
- Create my event may publish immediately; Continue later keeps setup in draft. Seating templates still need a chart. A free-only plan can force a requested paid ticket to free with a warning.

## Ahrefs evidence and keyword choices

The connected Ahrefs plugin was used for **77 seed keywords** in the **US**, with global volume for comparison. It returned **51 keyword rows**; 26 seeds were unavailable, not zero. Six organic SERP snapshots were inspected. [Saved requests, responses, and per-guide keyword candidates](seo/onboarding-2026-10-01.json) preserve the source update dates and nulls.

US/global volumes below are estimated monthly averages, not forecasts. A missing metric is shown as “unavailable”; zero is a returned estimate. The guides retain every requested event type even when its exact term has no data. Candidate queries are not necessarily the primary target: consumer resale and commercial buying intent were deliberately excluded where they do not fit a product setup guide.

| Guide | Ahrefs evidence (US / global) | Wording decision |
|---|---|---|
| Wine Tour | wine tour booking: 0 / 30 | Use tour bookings and timed tickets; avoid claiming demand for an unavailable booking-system phrase. |
| Concert | concert ticketing: 150 / 400; sell concert tickets online: 800 / 1,300 | The resale SERP is dominated by ticket resale platforms. Say “for your own event” and document organizer setup. |
| Class | class registration: 700 / 1,400; class registration form: 150 / 150 | Qualify registration with recurring sessions and Ticket Spot; results also include institutional enrollment. |
| Meetup | meetup registration: 0 / 0 | Retain the meetup RSVP task and explicitly distinguish it from Meetup.com synchronization. |
| Festival | festival ticketing: 150 / 600; festival ticketing system: 200 / 400 | Use tickets, full passes, and day passes. “System” is a commercial term, not a reason to create a software-comparison page. |
| Theatre | theatre ticketing: 10 / 20; theater ticketing: 200 / 250; theatre ticketing software: 200 / 450 | Retain the UI's Theatre spelling and qualify with reserved-seat setup. Broad US “theater ticketing” has a venue-related parent topic. |
| Sports Event | sports event registration: 40 / 80 | Describe spectator and participant setup without promising tournament or timing software. |
| Conference | conference registration: 400 / 900; conference registration form: 400 / 700 | Combine delegate forms with full/day passes and breakout capacity; SERPs include planning advice, platforms, and form templates. |
| Workshop | workshop registration: 30 / 100; workshop registration form: 150 / 300; sell workshop tickets: 40 / 80 | Emphasize registration, limited places, and actual form setup; SERPs mix form templates and services. |
| Seminar | seminar registration: 20 / 60; seminar registration form: 150 / 200 | Explain registration fields and physical/online joining settings. |
| Party | party rsvp: 350 / 450; party rsvp online: 20 / 20 | Describe guest registration and privacy. The inspected query also returns RSVP-card and tracking resources, so do not treat all volume as product setup demand. |
| Dinner | dinner registration: 0 / 0; dinner event tickets: unavailable | Preserve the meal, per-guest answers, and table/seat configuration task despite sparse data. |
| Comedy Show | comedy show tickets: 700 / 1,100; sell comedy show tickets: 50 / 90 | Consumer show discovery and resale are poor targets for this guide. Qualify it as setting up sales for a show the organizer runs. |
| Market | farmers market registration: 10 / 10; vendor registration: 80 / 1,700 | Keep visitor setup distinct from vendors. “Vendor registration” has procurement intent and is not a primary docs target. |
| Retreat | retreat registration: 10 / 10; retreat registration form: 150 / 150; retreat booking: 70 / 200 | Use registration and form setup. The booking SERP is dominated by consumer retreat marketplaces. |
| Bus Tour | bus tour booking: 10 / 60; bus tour tickets: 10 / 90 | Qualify bookings with departure setup and passenger capacity. |
| Single Event | single event registration: unavailable | Preserve a distinct template walkthrough; the established event-creation guide retains the broad creation workflow. |
| Repeating Event | recurring events: 100 / 200; recurring event registration: unavailable | Use “recurring event registration” as clear task wording without inventing a volume for that phrase. |
| Multi-day Event | multi day event registration / tickets: unavailable | Document the pass-model decision; the exact query's lack of data does not remove the support need. |
| Free RSVP | free event registration: 250 / 600; free rsvp: 700 / 1,000 | Explain free admission and RSVP setup without promising free software or unlimited account usage. |
| Assigned Seating | assigned seating ticketing: 0 / 0 | Explain the complete seat/category setup; link to the existing detailed seating references. |
| Start from scratch | create an event online: 90 / 250 | Use a narrow editor-entry guide and link to the existing creation guide instead of duplicating its broad target. |

Titles use organizer tasks and retain concise sidebar labels matching the onboarding cards. The overview groups activities for navigation and also lists the original primary, Popular, and Advanced template groups. Every guide links to the settings that own its detailed instructions. These guides support real user tasks; they are not duplicate keyword landing pages.

## Validation

Run the documentation checks with the dashboard checkout to verify template coverage alongside widget and plan inventories. Compile MDX and render the new pages to verify metadata, navigation, links, and mobile layouts. Test the actual booking configuration for an organizer's chosen event before launch; source review and rendered documentation checks do not prove live purchases or provider behavior.

Completed validation: all 135 MDX pages compile; 135 navigation entries, 1,483 local references, 503 widget controls, 111 named plan features, and the 21-template-plus-scratch map pass. All 23 new pages and the updated event-creation guide returned HTTP 200, with expected metadata/sidebar labels, no browser errors, and no horizontal overflow at desktop and 390px mobile widths. All 10 distinct linked heading anchors in the new section were found in the rendered destinations. The coverage checker accepted a complete fixture and rejected an undocumented template and a mismatched guide marker.

The workspace also contains unrelated edits and starter-file deletions. They are outside this documentation addition and must remain excluded from its commits.

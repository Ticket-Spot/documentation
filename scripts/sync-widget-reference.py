#!/usr/bin/env python3
"""Refresh the marked option tables from the dashboard's searchable UI inventory."""
import argparse
from collections import defaultdict
import html
import json
from pathlib import Path
import re

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--dashboard", type=Path, required=True)
parser.add_argument("--check", action="store_true")
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
entries = json.loads((args.dashboard / "src/modules/settings/search/settings-index.generated.json").read_text())
media_path = root / "scripts/widget-reference-media.json"
media = json.loads(media_path.read_text()) if media_path.exists() else {}
categories = {"design": "design", "display": "display", "layout": "layout", "filters": "event-filters", "user-filter": "visitor-filters", "checkout": "checkout", "text": "text"}
begin, end = "{/* BEGIN WIDGET OPTIONS */}", "{/* END WIDGET OPTIONS */}"
descriptions = {
    "checkoutIncludeTimezone": "Include the event timezone beside dates and times on the checkout page.",
    "checkoutShowEndDate": "Show the event's end date on the checkout page.",
    "checkoutShowEndTime": "Show the event's end time on the checkout page.",
    "checkoutShowStartDate": "Show the event's start date on the checkout page.",
    "checkoutShowStartTime": "Show the event's start time on the checkout page.",
    "displayOrderBy": "Choose Soonest first or Latest first.",
    "filterQueries": "Add, edit, or remove event inclusion rules. Combine them using All rules or Any rule.",
    "layoutDesign": "Choose the desktop event-listing layout from the Desktop choices above.",
    "mobileLayoutDesign": "Choose the mobile event-listing layout independently of the desktop layout.",
    "timeBasedEventLayout": "Choose Daily View, Full Calendar, or Time Slot Picker for date and time selection.",
    "removeAttendButton": "Turn on to show the attend/buy button; turn off to hide it.",
    "calendarView": "Choose the initial calendar view: Month, Week, Day, or List.",
    "showCalendarToday": "Show a Today button that returns the calendar to the current date.",
    "showCalendarTime": "Show event times in the Calendar layout.",
    "showCalendarWeekends": "Include Saturday and Sunday in the calendar display.",
    "showCategorySearchFilter": "Let visitors narrow the listing by event category.",
    "showCountrySearchFilter": "Let visitors narrow the listing by country.",
    "showLanguageSearchFilter": "Let visitors narrow the listing by event language; this does not translate the widget.",
    "showMonthSearchFilter": "Let visitors narrow the listing to a selected month.",
    "showVenueCitySearchFilter": "Let visitors narrow the listing by venue city.",
    "showVenueRegionSearchFilter": "Let visitors narrow the listing by venue region.",
    "showVenueSearchFilter": "Let visitors narrow the listing by venue.",
    "showWeekSearchFilter": "Let visitors narrow the listing to a selected week.",
    "showEndDate": "Show the event's end date in the widget listing.",
    "showEndTime": "Show the event's end time in the widget listing.",
    "showStartDate": "Show the event's start date in the widget listing.",
    "showTime": "Show the event's start time in the widget listing.",
    "showEventTitle": "Show the event title in the widget listing.",
}

def cell(value):
    value = re.sub(r"\s+", " ", str(value)).strip()
    value = value.replace("metadata.featured set to true", "marked as featured")
    return html.escape(value, quote=False).replace("|", "&#124;").replace("{", "&#123;").replace("}", "&#125;")

for category, slug in categories.items():
    groups = defaultdict(list)
    for entry in entries:
        if entry["category"] == category:
            groups[entry.get("subsectionLabel") or "Options"].append(entry)
    lines = [begin]
    for group, settings in sorted(groups.items()):
        lines += ["", "## " + cell(group), ""]
        pictures = media.get(category, {}).get(group, [])
        if pictures:
            lines += ['<Accordion title="View current controls">', ""]
            for picture in pictures:
                if not (root / picture["asset"]).is_file():
                    raise SystemExit(f"Missing approved widget capture: {picture['asset']}")
                lines += [
                    '<Frame caption="' + html.escape(picture["caption"], quote=True) + '">',
                    '  <img src="/' + picture["asset"] + '" alt="' + html.escape(picture["alt"], quote=True) + '" style={{ width: "100%", maxWidth: "515px", height: "auto" }} />',
                    '</Frame>', "",
                ]
            lines += ['</Accordion>', ""]
        lines += ["{/* widget-option: " + setting["key"] + " */}" for setting in settings]
        lines += ["", "| Option | Control | What it changes |", "|---|---|---|"]
        for setting in sorted(settings, key=lambda s: (s["label"].casefold(), s["kind"], s["key"])):
            kind = {"color": "Color", "font": "Font and style", "setting": "Setting"}[setting["kind"]]
            description = setting.get("description") or {
                "color": "Set the color of this element; review contrast in the preview.",
                "font": "Set the font family, size, bold, italic, and underline styling for this text.",
                "setting": ("Set the attendee-facing wording for this item." if category == "text" else "Adjust this option in the named section and check the preview."),
            }[setting["kind"]]
            if setting["subsectionLabel"] == "Payment plan":
                part = setting["key"].split("_installmentWidget_")[-1]
                area = next((name for prefix, name in [("plan", "Payment Plan Container"), ("today", "Due Today Section"), ("future", "Future Payments"), ("timeline", "Timeline")] if part.startswith(prefix)), "Payment plan")
                description = f"{area}: set the {setting['label'].lower()} and check contrast."
            description = descriptions.get(setting["key"], description)
            lines += [f"| **{cell(setting['label'])}** | {kind} | {cell(description)} |"]
    lines += ["", end]
    path = root / "branding-and-design" / f"widget-{slug}-reference.mdx"
    current = path.read_text()
    before, marked = current.split(begin, 1)
    _, after = marked.split(end, 1)
    updated = before + "\n".join(lines) + after
    if args.check:
        if updated != current:
            raise SystemExit(f"Outdated widget reference: {path.relative_to(root)}")
    else:
        path.write_text(updated)
print(f"{'Checked' if args.check else 'Updated'} {len(entries)} options across {len(categories)} widget reference pages.")

#!/usr/bin/env python3
"""Check navigation, frontmatter, local links/media, and source inventory coverage."""
import argparse
from collections import Counter
import json
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--dashboard", type=Path)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
pages = {p.relative_to(root).with_suffix("").as_posix(): p for p in root.rglob("*.mdx") if "node_modules" not in p.parts}
errors = []
nav_pages = []

def walk(value):
    if isinstance(value, dict):
        for key, item in value.items():
            if key == "pages":
                for page in item:
                    if isinstance(page, str):
                        nav_pages.append(page)
                    else:
                        walk(page)
            else:
                walk(item)
    elif isinstance(value, list):
        for item in value:
            walk(item)

walk(json.loads((root / "docs.json").read_text())["navigation"])
for page, count in Counter(nav_pages).items():
    if page not in pages:
        errors.append(f"Navigation target missing: {page}")
    if count > 1:
        errors.append(f"Repeated navigation entry: {page}")
for page in pages.keys() - set(nav_pages):
    errors.append(f"Page missing from navigation: {page}")

descriptions = {}
local_links = 0
for slug, path in pages.items():
    content = path.read_text()
    frontmatter = re.match(r"^---\n(.*?)\n---(?:\n|$)", content, re.S)
    if not frontmatter:
        errors.append(f"No frontmatter: {slug}")
        continue
    for field in ("title", "description"):
        match = re.search(rf"^{field}:\s*[\"']?(.+?)[\"']?\s*$", frontmatter[1], re.M)
        if not match:
            errors.append(f"No {field}: {slug}")
        elif field == "description":
            if match[1] in descriptions:
                errors.append(f"Repeated description: {slug} and {descriptions[match[1]]}")
            descriptions[match[1]] = slug
    body = re.sub(r"```.*?```", "", content, flags=re.S)
    links = re.findall(r"!?\[[^\]\n]*\]\(([^)\n]+)\)", body)
    links += re.findall(r"(?:href|src)=[\"']([^\"']+)[\"']", body)
    for target in links:
        target = target.strip().split(' "')[0]
        if target.startswith("<") and target.endswith(">"):
            target = target[1:-1]
        url = urlsplit(target)
        if url.scheme or url.netloc or not url.path:
            continue
        local_links += 1
        location = (root / unquote(url.path).lstrip("/")) if url.path.startswith("/") else path.parent / unquote(url.path)
        candidates = [location, location.with_suffix(".mdx"), location / "index.mdx"] if not location.suffix else [location]
        if not any(candidate.is_file() for candidate in candidates):
            errors.append(f"Missing local link/media in {slug}: {target}")

if args.dashboard:
    index = json.loads((args.dashboard / "src/modules/settings/search/settings-index.generated.json").read_text())
    actual = Counter()
    for path in root.glob("branding-and-design/widget-*-reference.mdx"):
        actual.update(re.findall(r"widget-option: ([^ ]+) ", path.read_text()))
    expected = Counter(entry["key"] for entry in index)
    if actual != expected:
        errors.append(f"Widget coverage mismatch: missing={dict(expected-actual)}, extra={dict(actual-expected)}")
    inventory = json.loads((args.dashboard / "src/modules/sites/plan-feature-list.json").read_text())
    feature_text = (root / "account/feature-reference.mdx").read_text()
    features = [item["feature"] for group in inventory.values() for item in group]
    missing = [feature for feature in features if feature not in feature_text]
    if missing:
        errors.append(f"Feature names missing from plan reference: {missing}")
    print(f"Source inventories: {len(index)} widget controls; {len(features)} named plan features.")

if errors:
    raise SystemExit("\n".join(errors))
print(f"Passed: {len(pages)} MDX pages, {len(nav_pages)} navigation entries, {local_links} local links/media.")
print("External URLs, rendered anchors, and authenticated product workflows need separate verification.")

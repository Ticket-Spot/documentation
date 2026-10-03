#!/usr/bin/env python3
"""Reconcile captured assets and actual article placements without marking briefs complete."""
from pathlib import Path
from collections import Counter, defaultdict
import json, re
from datetime import datetime, timezone

root = Path(__file__).resolve().parents[1]
def read(name): return json.loads((root / name).read_text())
def write(name, data): (root / name).write_text(json.dumps(data, indent=2, ensure_ascii=False) + '\n')
plan = read('media-review/capture-plan.json')
records = read('media-review/production/captures.json')
first = read('media-review/first-page/manifest.json')
# Avoid walking dependency trees for every asset.
articles = {}
for folder in root.iterdir():
    if folder.is_dir() and folder.name not in {'node_modules', '.git', '.mintlify', 'assets', 'media-review'}:
        for path in folder.rglob('*.mdx'):
            articles[str(path.relative_to(root))] = path.read_text()
for record in records.values():
    record['integrated_pages'] = [p for p, text in articles.items() if record['asset'] in text or '../' + record['asset'] in text]
ready = lambda r: r.get('qa') in {'passed visual review', 'approved first-page capture'}
assets = {r['asset']: r for r in records.values()}
for shot in first['shots']:
    assets.setdefault(shot['asset'], {**shot, 'format': 'PNG', 'qa': 'approved first-page capture', 'integrated_pages': [first['page']]})
posters = {r.get('poster') for r in assets.values() if r.get('poster')}
# Posters are companion files, not independent instructional screenshots.
primary_assets = [r for p, r in assets.items() if p not in posters]
by_id = defaultdict(list)
for r in records.values(): by_id[r['id']].append(r)
for shot in plan['shots']:
    found = by_id.get(shot['id'], [])
    if not found: continue
    shot['captured_assets'] = [r['asset'] for r in found]
    shot['integrated_pages'] = sorted({p for r in found for p in r.get('integrated_pages', [])})
    shot['capture_qa'] = dict(Counter(r['qa'] for r in found))
    if any(ready(r) for r in found):
        shot['status'] = 'Current assets reviewed'
    else:
        shot['status'] = 'Captured; visual review pending'
    if shot.get('dependency'):
        shot['status'] += '; dependency TODO: ' + shot['dependency']
    if shot['access'] != 'Demo browser' and not shot.get('external_capture_complete'):
        shot['status'] += '; external result TODO'
    shot['delivered_formats'] = sorted({r.get('format', 'PNG') for r in found})
now = datetime.now(timezone.utc).isoformat()
progress = {
    'updated_at': now,
    'status': ('Available Demo documentation and media pass reviewed; external, device, and conditional account states remain TODO'
               if plan.get('local_review', {}).get('status') == 'available_demo_pass_reviewed'
               else 'Full refresh in progress; remaining capture briefs and legacy placements are still queued'),
    'planned_capture_units': len(plan['shots']),
    'units_with_any_capture': len(by_id),
    'checked_screenshots': sum(ready(r) and r.get('format') != 'GIF' for r in primary_assets),
    'checked_gifs': sum(ready(r) and r.get('format') == 'GIF' for r in primary_assets),
    'companion_posters': len(posters),
    'pending_review': sum(not ready(r) and r.get('qa') != 'needs recapture' for r in primary_assets),
    'needs_recapture': sum(r.get('qa') == 'needs recapture' for r in primary_assets),
    'guides_with_current_media': len({p.removesuffix('.mdx') for r in primary_assets if ready(r) for p in r.get('integrated_pages', [])}),
    'external_capture_units_deferred': sum(s['access'] != 'Demo browser' and not s.get('external_capture_complete') for s in plan['shots']),
    'coverage_note': 'An asset count is not a completion percentage. A brief may require several controls, states, or an animation; current and legacy media can coexist in one guide.',
    'pages': [{
        'path': p,
        'current_assets': sorted({r['asset'] for r in primary_assets if ready(r) and p in r.get('integrated_pages', [])}),
        'capture_ids': [s['id'] for s in plan['shots'] if p in s['pages']],
    } for p in sorted(articles)],
}
plan['summary'].update(capture_units=len(plan['shots']), pages_covered=len(articles), annotated_screenshots=sum(s['format']=='Annotated screenshot' for s in plan['shots']), zoom_gifs=sum(s['format']=='Zoom GIF + static poster' for s in plan['shots']), priority_0=sum(s['priority']=='P0' for s in plan['shots']), priority_1=sum(s['priority']=='P1' for s in plan['shots']), demo_browser_units=sum(s['access']=='Demo browser' for s in plan['shots']))
plan['production'] = {k:v for k,v in progress.items() if k != 'pages'}
write('media-review/production/captures.json', records)
write('media-review/capture-plan.json', plan)
write('media-review/progress.json', progress)
print(json.dumps({k:v for k,v in progress.items() if k != 'pages'}, indent=2))

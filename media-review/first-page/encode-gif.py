"""Encode captured browser frames, preserving their pixels and explicit timing."""
import json
import os
from pathlib import Path
from PIL import Image
root = Path(__file__).resolve().parents[2]
frames_dir = Path(os.environ.get('TICKETSPOT_FRAMES', '/tmp/ticketspot-widget-frames'))
frames = [Image.open(p).convert('RGB') for p in sorted(frames_dir.glob('*.png'))]
durations = json.loads((frames_dir / 'durations.json').read_text())
assert len(frames) == len(durations)
# One shared palette avoids color flicker between browser frames.
palette = frames[0].quantize(colors=256)
indexed = [frame.quantize(palette=palette, dither=Image.Dither.NONE) for frame in frames]
output = root / 'assets/refresh/getting-started/platform-widget-tour.gif'
indexed[0].save(output, save_all=True, append_images=indexed[1:], duration=durations, loop=0, disposal=1, optimize=True)
with Image.open(output) as result:
    total = 0
    for i in range(result.n_frames):
        result.seek(i)
        total += result.info['duration']
    print(f'{output.name}: {result.size}, {result.n_frames} frames, {total} ms, {output.stat().st_size:,} bytes')

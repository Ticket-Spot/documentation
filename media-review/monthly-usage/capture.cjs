// Capture the authenticated Ticket Spot Demo UI; no fixtures or account changes.
// NODE_PATH must include Playwright. Start a dedicated Chrome CDP session first.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const { highlight, clearHighlights } = require('../first-page/capture-helpers.cjs');
const root = path.resolve(__dirname, '../..');

(async () => {
  const browser = await chromium.connectOverCDP(process.env.TICKETSPOT_CDP_URL || 'http://127.0.0.1:9227', { timeout: 20000 });
  const context = browser.contexts()[0];
  const source = context.pages().find(p => /ticketspotapp\.com\/manage|localhost:8080/.test(p.url()) && !p.url().includes('/auth/'));
  if (!source) throw new Error('Sign in to Ticket Spot Demo in the capture window first.');
  const page = source;
  const originalViewport = await page.evaluate(() => ({ width: innerWidth, height: innerHeight }));
  const errors = [];
  page.on('pageerror', e => errors.push(e.name));
  page.setDefaultTimeout(20000);
  await page.setViewportSize({ width: 1440, height: 1100 });
  const session = await context.newCDPSession(page);
  const url = new URL(source.url());
  if (!url.hash.startsWith('#/events') && !url.pathname.endsWith('/events')) {
    if (url.hash.startsWith('#/')) url.hash = '#/events';
    else url.pathname = '/manage/events';
    await page.goto(url.toString(), { waitUntil: 'domcontentloaded' });
  }
  await page.getByText('Ticket Spot Demo', { exact: true }).waitFor();
  const card = page.getByRole('button', { name: 'Current plan and usage — view detailed usage' });
  await card.waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(700);
  await page.evaluate(() => scrollTo(0, 0));
  const capture = async (name, targets, clip) => {
    await highlight(page, targets);
    const asset = `assets/refresh/account/${name}.png`;
    try {
      // Capture at high resolution directly from Chrome so cropped labels stay sharp in docs.
      const result = await session.send('Page.captureScreenshot', { format: 'png', clip: { ...clip, scale: 2 }, captureBeyondViewport: false });
      fs.writeFileSync(path.join(root, asset), Buffer.from(result.data, 'base64'));
    }
    finally { await clearHighlights(page); }
    return asset;
  };
  const bounds = await card.boundingBox();
  const entry = await capture('monthly-usage-entry', [card.getByText('Usage is within plan limits', { exact: true })], {
    x: 50, y: 0, width: 1340, height: Math.min(1050, Math.ceil(bounds.y + bounds.height + 28)),
  });
  await card.getByText('Current plan', { exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.waitFor();
  await page.waitForTimeout(500);
  const dialogBounds = await dialog.boundingBox();
  const details = await capture('monthly-usage-details', [dialog.getByText('Used this cycle', { exact: true }).first()], {
    x: Math.max(0, dialogBounds.x - 8), y: Math.max(0, dialogBounds.y - 8),
    width: dialogBounds.width + 16, height: dialogBounds.height + 16,
  });
  const attendeeLabel = dialog.getByText('Used this cycle', { exact: true }).first();
  const attendeeCard = attendeeLabel.locator('xpath=ancestor::div[contains(@style, "overflow: hidden")][1]');
  const attendeeBounds = await attendeeCard.boundingBox();
  const attendees = await capture('monthly-usage-attendees', [attendeeLabel], {
    x: attendeeBounds.x - 8, y: attendeeBounds.y - 8,
    width: attendeeBounds.width + 16, height: attendeeBounds.height + 16,
  });
  const record = {
    capturedOn: '2026-10-12', source: 'Authenticated Ticket Spot Demo dashboard',
    route: url.origin + url.pathname + url.hash, assets: [entry, details, attendees],
    usageText: await dialog.innerText(), browserErrors: errors, qa: 'pending visual review',
    accountChanges: 'None; opened the Events usage card only.',
  };
  fs.writeFileSync(path.join(__dirname, 'capture.json'), JSON.stringify(record, null, 2) + '\n');
  console.log(JSON.stringify({ assets: record.assets, browserErrors: errors }));
  await dialog.getByRole('button', { name: 'Close', exact: true }).click();
  await page.setViewportSize({ width: originalViewport.width, height: originalViewport.height });
  await session.detach();
  await browser.close();
})().catch(e => { console.error(e.message); process.exit(1); });

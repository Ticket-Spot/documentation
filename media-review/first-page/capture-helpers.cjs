// Capture the real browser page with native SVG annotations; do not redraw UI.
// Connect only to the dedicated, user-authenticated documentation browser.
const {chromium} = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const ROOT = path.resolve(__dirname, '../..');
const COLOR = '#9c26dc';

async function connect() {
  const browser = await chromium.connectOverCDP(process.env.TICKETSPOT_CDP_URL || 'http://127.0.0.1:9227');
  const context = browser.contexts()[0];
  const dashboard = process.env.TICKETSPOT_DASHBOARD_URL || 'http://localhost:8080/';
  const page = context.pages().find(p => p.url().startsWith(dashboard));
  if (!page || page.url().includes('/auth/')) throw new Error('Sign in to Ticket Spot Demo in the Chrome capture window first.');
  return {browser, context, page};
}

async function calloutBox(locator) {
  const box = await locator.boundingBox();
  if (!box) return null;
  // Text labels can stretch across a whole panel. Circle the rendered words,
  // without changing the product DOM or its layout. Keep full control bounds
  // for inputs, images, and labels that contain interactive children.
  const text = await locator.evaluate(e => {
    if (!e.textContent?.trim() || e.matches('button,input,textarea,select,img,canvas,svg') || e.querySelector('input,textarea,select,button,img,canvas,svg')) return null;
    const range = document.createRange();
    range.selectNodeContents(e);
    const r = range.getBoundingClientRect(), b = e.getBoundingClientRect();
    return r.width && r.height && r.width < b.width ? {dx:r.x-b.x,dy:r.y-b.y,width:r.width,height:r.height} : null;
  });
  return text ? {x:box.x+text.dx,y:box.y+text.dy,width:text.width,height:text.height} : box;
}

async function highlight(page, locators) {
  if (locators.length > 3) throw new Error('Use no more than three callouts per frame.');
  const boxes = [];
  for (const locator of locators) {
    if (await locator.count() !== 1) throw new Error('Highlight must identify exactly one real UI control.');
    const box = await calloutBox(locator);
    if (!box) throw new Error('Highlight target is not visible.');
    boxes.push(box);
  }
  await page.evaluate(({boxes, color}) => {
    document.getElementById('documentation-capture-highlights')?.remove();
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'documentation-capture-highlights';
    Object.assign(svg.style, {position:'fixed', inset:'0', width:'100vw', height:'100vh', pointerEvents:'none', zIndex:'2147483647', overflow:'visible'});
    for (const box of boxes) {
      const ellipse = document.createElementNS(svg.namespaceURI, 'ellipse');
      Object.entries({cx:box.x+box.width/2, cy:box.y+box.height/2, rx:box.width/2+11, ry:box.height/2+10, fill:'none', stroke:color, 'stroke-width':4, 'vector-effect':'non-scaling-stroke'}).forEach(([k,v])=>ellipse.setAttribute(k,String(v)));
      svg.appendChild(ellipse);
    }
    document.documentElement.appendChild(svg);
  }, {boxes, color:COLOR});
}

async function clearHighlights(page) {
  await page.evaluate(() => document.getElementById('documentation-capture-highlights')?.remove());
}

async function capture(page, {name, targets=[], clip, masks=[]}) {
  if (!/^[a-z0-9-]+\.png$/.test(name)) throw new Error('Use a descriptive PNG filename.');
  await page.evaluate(() => document.fonts.ready);
  // Let modal/menu entrance transitions settle before measuring callout targets.
  await page.waitForTimeout(400);
  await highlight(page, targets);
  const directory = path.join(ROOT, 'assets/refresh/getting-started');
  fs.mkdirSync(directory, {recursive:true});
  const output = path.join(directory, name);
  try {
    await page.screenshot({path:output, clip, fullPage:false, animations:'disabled', caret:'hide', mask:masks, maskColor:'#f0eef4'});
  } finally { await clearHighlights(page); }
  return output;
}
module.exports={connect, highlight, clearHighlights, capture, calloutBox, COLOR, ROOT};

// Run with the authenticated capture browser on Design > Widget > Quick Settings.
// Frames contain live DOM only; presentation transforms are restored afterwards.
const {connect,highlight,clearHighlights,capture,ROOT}=require('./capture-helpers.cjs');
const fs=require('node:fs'),path=require('node:path');
(async()=>{const {browser,page}=await connect();page.setDefaultTimeout(10000);const frames=process.env.TICKETSPOT_FRAMES||'/tmp/ticketspot-widget-frames';fs.mkdirSync(frames,{recursive:true});const durations=[];let n=0;const clip={x:75,y:165,width:1270,height:675};const original=await page.evaluate(()=>({transform:document.body.style.transform,origin:document.body.style.transformOrigin}));
async function frame(ms){await page.screenshot({path:path.join(frames,`${String(n++).padStart(3,'0')}.png`),clip,scale:'css',animations:'disabled',caret:'hide'});durations.push(ms)}
async function zoom(s){await page.evaluate(s=>{document.body.style.transformOrigin='75px 180px';document.body.style.transform=`scale(${s})`;},s)}
try{await page.bringToFront();await page.evaluate(()=>scrollTo(0,0));await page.getByText('Quick Settings',{exact:true}).click();await page.frameLocator('iframe').getByText('Sunset Yoga in the Park',{exact:true}).first().waitFor({timeout:20000});await highlight(page,[page.getByText('All Settings',{exact:true})]);await frame(1300);
for(let i=1;i<=12;i++){const t=i/12,s=1+.25*(t*t*(3-2*t));await zoom(s);await highlight(page,[page.getByText('All Settings',{exact:true})]);await frame(60)}
await frame(800);await page.getByText('All Settings',{exact:true}).click();await page.waitForTimeout(600);await highlight(page,[page.getByText('All Settings',{exact:true})]);await frame(1700);
for(let i=1;i<=12;i++){const t=i/12,s=1.25-.25*(t*t*(3-2*t));await zoom(s);await highlight(page,[page.getByText('All Settings',{exact:true})]);await frame(60)}
await frame(2000);await capture(page,{name:'platform-widget-tour-poster.png',clip,targets:[page.getByText('All Settings',{exact:true})]});fs.writeFileSync(path.join(frames,'durations.json'),JSON.stringify(durations));console.log(JSON.stringify({frames:n,duration:durations.reduce((a,b)=>a+b),directory:frames}));
}finally{await clearHighlights(page);await page.evaluate(o=>{document.body.style.transform=o.transform;document.body.style.transformOrigin=o.origin},original);await page.getByText('Quick Settings',{exact:true}).click();await browser.close();}})();

const fs=require('node:fs'),path=require('node:path');
const {connect:baseConnect,highlight,clearHighlights,calloutBox,ROOT}=require('../first-page/capture-helpers.cjs');
const PLAN=JSON.parse(fs.readFileSync(path.join(ROOT,'media-review/capture-plan.json')));
const registryPath=path.join(__dirname,'captures.json');
async function connect(){const c=await baseConnect();await c.page.bringToFront();await c.page.waitForLoadState('domcontentloaded');await c.page.waitForTimeout(500);c.page.setDefaultTimeout(12000);return c}
const text=(p,t)=>p.getByText(t,{exact:true});
async function settle(page){await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(450)}
async function shot(page,id,{targets=[],clip={x:75,y:165,width:1270,height:700},caption,alt,masks=[],suffix='',source='Ticket Spot Demo live dashboard',allowUnannotated=false}={}){
 const item=PLAN.shots.find(s=>s.id===id);if(!item)throw Error('Unknown capture '+id);
 if(page.url().includes('/auth/'))throw Error('Capture session expired. Sign in to Ticket Spot Demo before continuing.');
 if(!targets.length&&!allowUnannotated)throw Error('Choose a visible circle target, or explicitly mark this as an unannotated result view.');
 await settle(page);
 let output=item.output.replace(/\.gif$/,'.png').replace(/\.png$/,suffix+'.png');
 const v=page.viewportSize()||{width:1440,height:900};clip={...clip,height:Math.min(clip.height,v.height-clip.y),width:Math.min(clip.width,v.width-clip.x)};
 // Refuse a loading preview or a circle that would be cut off. Keep the failed
 // attempt out of the manifest instead of treating a written PNG as complete.
 await page.waitForFunction(c=>![...document.querySelectorAll('[class*="loadingOverlay"],.p-datatable-loading-overlay,.p-datatable-loading-icon,.pi-spin,.animate-spin,[class*="spinner"],[class*="Loader"][class*="root"],[role="progressbar"],[role="status"]')].some(e=>{
  if(e.getAttribute('role')==='status'&&!/^loading\b/i.test(e.textContent.trim()))return false;
  // Attendance and capacity bars are data visualizations, not loading indicators.
  if(e.matches('.p-progressbar-determinate[aria-valuenow]'))return false;
  const b=e.getBoundingClientRect();return b.width&&b.height&&b.left<c.x+c.width&&b.right>c.x&&b.top<c.y+c.height&&b.bottom>c.y;
 }),clip,{timeout:15000});
 for(const target of targets){
  if(await target.count()!==1)throw Error('Circle target must identify one control.');
  const clipped=await target.evaluate(e=>{
   const r=document.createRange();r.selectNodeContents(e);
   const b=e.textContent?.trim()&&!e.matches('button,input,textarea,select,img,canvas,svg')?r.getBoundingClientRect():e.getBoundingClientRect();
   for(let p=e.parentElement;p;p=p.parentElement){
    const s=getComputedStyle(p),c=p.getBoundingClientRect();
    if(/auto|scroll|hidden|clip/.test(s.overflowY)&&(b.top<c.top-1||b.bottom>c.bottom+1))return true;
    if(/auto|scroll|hidden|clip/.test(s.overflowX)&&(b.left<c.left-1||b.right>c.right+1))return true;
    // A viewport-fixed modal is not clipped to the shorter document body's
    // bounds. Its own scroll containers above have already been checked.
    if(s.position==='fixed'){
     let localContainingBlock=false;
     for(let a=p.parentElement;a;a=a.parentElement){
      const cs=getComputedStyle(a);
      if(cs.transform!=='none'||cs.perspective!=='none'||cs.filter!=='none'||/paint|layout|strict|content/.test(cs.contain)){
       localContainingBlock=true;break;
      }
     }
     if(!localContainingBlock)break;
    }
   }
   return false;
  });
  if(clipped)throw Error('Circle target is clipped by a scroll container. Scroll the control into view before capture.');
  const b=await calloutBox(target);
  if(!b||b.x-14<clip.x||b.y-13<clip.y||b.x+b.width+14>clip.x+clip.width||b.y+b.height+13>clip.y+clip.height)throw Error('Circle target falls outside the capture crop. Scroll or split the panel before capture.');
 }
 await highlight(page,targets);
 try{fs.mkdirSync(path.dirname(path.join(ROOT,output)),{recursive:true});await page.screenshot({path:path.join(ROOT,output),clip,animations:'disabled',caret:'hide',mask:masks,maskColor:'#f0eef4'});}finally{await clearHighlights(page)}
 const records=fs.existsSync(registryPath)?JSON.parse(fs.readFileSync(registryPath)):{};
 const key=id+suffix;records[key]={id,key,asset:output,pages:item.pages,title:item.title,caption:caption||item.title,alt:alt||caption||item.title,source,capturedAt:new Date().toISOString(),route:new URL(page.url()).hash.split('?')[0],callouts:await Promise.all(targets.map(t=>t.innerText().catch(()=>t.getAttribute('aria-label')))),clip,format:'PNG',qa:'pending visual review'};
 fs.writeFileSync(registryPath,JSON.stringify(records,null,2)+'\n');console.log('CAPTURED '+key+' '+output);return output
}
async function existing(id,asset,caption){const item=PLAN.shots.find(s=>s.id===id);const r=fs.existsSync(registryPath)?JSON.parse(fs.readFileSync(registryPath)):{};r[id]={id,key:id,asset,pages:item.pages,title:item.title,caption,alt:caption,source:'Approved fresh first-page capture; shared without regenerating',format:'PNG',qa:'approved first-page capture'};fs.writeFileSync(registryPath,JSON.stringify(r,null,2)+'\n')}
async function top(page){await page.evaluate(()=>scrollTo(0,0));await settle(page)}
async function scrollTo(page,locator,y=190){await locator.evaluate((e,y)=>window.scrollBy(0,e.getBoundingClientRect().top-y),y);await settle(page)}
module.exports={connect,shot,existing,text,settle,top,scrollTo,ROOT,PLAN};

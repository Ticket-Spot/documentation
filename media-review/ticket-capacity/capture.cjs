const {chromium}=require('playwright');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const errors=[];
 const output=require('node:path').resolve(__dirname,'../../assets/refresh/event-management');
 fs.mkdirSync(output,{recursive:true});
 for(const [name,width,height,query] of [['ticket-capacity-settings',1440,900,''],['ticket-capacity-settings-mobile',390,844,''],['ticket-capacity-analytics',1440,900,'?analytics']]){
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:2});
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto('http://127.0.0.1:9231/'+query,{waitUntil:'networkidle'});
  await page.waitForTimeout(800);
  console.log(name,(await page.locator('body').innerText()).slice(0,1500));
  if(query) await page.getByText('Capacity Used',{exact:true}).waitFor();
  else { await page.getByText('Capacity used per ticket',{exact:true}).waitFor(); await page.getByText('Ticket and price',{exact:true}).click(); const input=await page.getByLabel('Capacity used per ticket',{exact:true}).boundingBox(); await page.evaluate(box=>{const mark=document.createElement('div');Object.assign(mark.style,{position:'absolute',left:(box.x-8)+'px',top:(box.y+scrollY-8)+'px',width:(box.width+16)+'px',height:(box.height+16)+'px',border:'4px solid #9c26dc',borderRadius:'50%',pointerEvents:'none',boxSizing:'border-box'});document.body.append(mark);},input); }
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  console.log('overflow',overflow);
  await page.screenshot({path:output+'/'+name+'.png',fullPage:width<500});
  await page.close();
 }
 console.log('browserErrors',errors);await browser.close();if(errors.length)process.exitCode=1;
})();

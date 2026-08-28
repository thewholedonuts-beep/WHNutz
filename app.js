const links=[...document.querySelectorAll('[data-branch]')];
const store=document.querySelector('#branch-store');
const stores={
  awd:['Browse the Whole Donuts store','https://wholedonuts.buzz/'],
  tnc:['Browse the chef store','https://thenutur3dchef.com/']
};
const memoryStore=new Map();

function safeGet(key){
  try{return localStorage.getItem(key)}catch(e){return memoryStore.has(key)?memoryStore.get(key):null}
}
function safeSet(key,value){
  try{localStorage.setItem(key,value)}catch(e){memoryStore.set(key,String(value))}
}
function safeRemove(key){
  try{localStorage.removeItem(key)}catch(e){memoryStore.delete(key)}
}

function syncBranch(){
  const id=location.hash.slice(1);
  links.forEach(a=>a.classList.toggle('active',a.dataset.branch===id));
  if(stores[id]){store.textContent=stores[id][0]+' ↗';store.href=stores[id][1]}
  else{store.textContent='Open the menu';store.href='#home'}
}

const menuButtons=[...document.querySelectorAll('[data-menu]')];
const menuPanels=[...document.querySelectorAll('[data-course]')];
function openCourse(id,{focus=false}={}){
  menuButtons.forEach(button=>{
    const active=button.dataset.menu===id;
    button.classList.toggle('active',active);
    button.setAttribute('aria-selected',String(active));
    button.tabIndex=active?0:-1;
    if(active&&focus)button.focus();
  });
  menuPanels.forEach(panel=>panel.hidden=panel.dataset.course!==id);
}
menuButtons.forEach(button=>button.addEventListener('click',()=>openCourse(button.dataset.menu)));
menuButtons.forEach((button,index)=>button.addEventListener('keydown',event=>{
  const {key}=event;
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(key))return;
  event.preventDefault();
  let nextIndex=index;
  if(key==='Home')nextIndex=0;
  else if(key==='End')nextIndex=menuButtons.length-1;
  else if(key==='ArrowLeft')nextIndex=(index-1+menuButtons.length)%menuButtons.length;
  else nextIndex=(index+1)%menuButtons.length;
  openCourse(menuButtons[nextIndex].dataset.menu,{focus:true});
}));

const dateLabel=document.querySelector('#daily-date');
if(dateLabel)dateLabel.textContent=new Intl.DateTimeFormat(undefined,{weekday:'long',month:'long',day:'numeric'}).format(new Date());

const counter=document.querySelector('#community-counter');
if(menuButtons.length)openCourse('bits');
if(counter&&counter.hidden)counter.hidden=false;

const passButton=document.querySelector('#make-pass');
const passCard=document.querySelector('#pass-card');
const passImage=document.querySelector('#pass-qr');
const passName=document.querySelector('#pass-name');
const passLink=document.querySelector('#open-pass-link');
const copyPassLink=document.querySelector('#copy-pass-link');
const passHelp=document.querySelector('#pass-help');
const passFallback=document.querySelector('#pass-fallback');
let displayedPass=null;
// +U passes use the generated format +U-<STAMP>-<4 CHAR SUFFIX>, where STAMP is a timestamp-derived base36 token.
function validPass(value){
  return typeof value==='string'&&/^\+U-[A-Z0-9]{1,32}-[A-Z0-9]{4}$/.test(value);
}
function passUrl(pass){
  return 'https://wenevergonnaclose.com/?u='+encodeURIComponent(pass);
}
function syncPassFromQuery(){
  const params=new URLSearchParams(location.search);
  const incoming=params.get('u');
  if(!incoming)return 'none';
  const pass=incoming.trim();
  if(!validPass(pass))return 'invalid';
  const existing=safeGet('plusu-pass');
  let current=existing;
  if(current&&!validPass(current)){
    safeRemove('plusu-pass');
    current=null;
  }
  if(current&&current!==pass){
    console.info('Ignoring incoming +U pass because this browser already has a different saved pass.');
    return 'kept-existing';
  }
  safeSet('plusu-pass',pass);
  safeSet('plusu-last-visit',new Date().toISOString());
  return 'restored';
}
const passRestoreState=syncPassFromQuery();
function getPass(){
  let pass=safeGet('plusu-pass');
  if(pass&&!validPass(pass)){
    safeRemove('plusu-pass');
    pass=null;
  }
  if(!pass){
    const stamp=Date.now().toString(36).toUpperCase();
    const spice=Math.random().toString(36).slice(2,6).toUpperCase();
    pass='+U-'+stamp+'-'+spice;
    safeSet('plusu-pass',pass);
  }
  return pass;
}
function renderPass(renderQr){
  if(!passCard||!passImage||!passName)return;
  const pass=getPass();
  const url=passUrl(pass);
  displayedPass=pass;
  passName.textContent=pass;
  if(passLink)passLink.href=url;
  passCard.hidden=false;
  if(renderQr){
    passImage.hidden=false;
    passImage.src='https://api.qrserver.com/v1/create-qr-code/?size=720x720&data='+encodeURIComponent(url);
    passImage.alt='Your private +U QR for '+pass;
  }else{
    passImage.hidden=true;
    passImage.removeAttribute('src');
    passImage.alt='Your private +U QR is ready when requested';
  }
  if(passButton)passButton.textContent=renderQr?'Refresh your +U QR':'Show your +U QR';
  if(copyPassLink)copyPassLink.textContent='Copy my private +U link';
  if(passHelp){
    passHelp.textContent=passRestoreState==='restored'
      ?'This browser restored your +U pass from a private link. Request a QR only if you want one on screen.'
      :passRestoreState==='kept-existing'
        ?'This browser kept its existing +U pass. Request a QR only if you want one on screen.'
        :'The QR image is requested from a third-party QR service only after you ask for it.';
  }
  if(passFallback)passFallback.hidden=true;
  safeSet('plusu-last-visit',new Date().toISOString());
  if(passRestoreState==='restored'&&counter&&!counter.hidden){
    passCard.scrollIntoView({behavior:'smooth',block:'nearest'});
  }
}
if(passButton)passButton.addEventListener('click',()=>renderPass(true));
if(validPass(safeGet('plusu-pass')))renderPass(false);
if(passImage&&passFallback){
  passImage.addEventListener('error',()=>{
    if(!passImage.hidden&&passImage.getAttribute('src'))passFallback.hidden=false;
  });
  passImage.addEventListener('load',()=>{passFallback.hidden=true});
}
if(copyPassLink)copyPassLink.addEventListener('click',async()=>{
  if(!displayedPass)renderPass(false);
  if(!displayedPass){
    copyPassLink.textContent='Copy unavailable';
    return;
  }
  const pass=displayedPass;
  const url=passUrl(pass);
  try{
    if(navigator.clipboard&&navigator.clipboard.writeText){
      await navigator.clipboard.writeText(url);
      copyPassLink.textContent='Link copied';
    }else{
      copyPassLink.textContent='Copy unavailable';
    }
  }catch(e){
    copyPassLink.textContent='Copy unavailable';
  }
});

addEventListener('hashchange',syncBranch);
syncBranch();
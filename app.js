const links=[...document.querySelectorAll('[data-branch]')];
const store=document.querySelector('#branch-store');
const stores={
  awd:['Browse the Whole Donuts store','https://wholedonuts.buzz/'],
  tnc:['Browse the chef store','https://thenutur3dchef.com/']
};

function syncBranch(){
  const id=location.hash.slice(1);
  links.forEach(a=>a.classList.toggle('active',a.dataset.branch===id));
  if(stores[id]){store.textContent=stores[id][0]+' ↗';store.href=stores[id][1]}
  else{store.textContent='Open the menu';store.href='#home'}
}

const menuButtons=[...document.querySelectorAll('[data-menu]')];
const menuPanels=[...document.querySelectorAll('[data-course]')];
function openCourse(id){
  menuButtons.forEach(button=>{
    const active=button.dataset.menu===id;
    button.classList.toggle('active',active);
    button.setAttribute('aria-selected',String(active));
  });
  menuPanels.forEach(panel=>panel.hidden=panel.dataset.course!==id);
}
menuButtons.forEach(button=>button.addEventListener('click',()=>openCourse(button.dataset.menu)));
if(menuButtons.length)openCourse('bits');

const dateLabel=document.querySelector('#daily-date');
if(dateLabel)dateLabel.textContent=new Intl.DateTimeFormat(undefined,{weekday:'long',month:'long',day:'numeric'}).format(new Date());

const gate=document.querySelector('#welcome-gate');
const counter=document.querySelector('#community-counter');
const steps=[...document.querySelectorAll('[data-question]')];
const welcomeResult=document.querySelector('#welcome-result');
const welcomeAnswers={};

function showQuestion(number){
  steps.forEach(step=>step.hidden=Number(step.dataset.question)!==number);
  const progress=document.querySelector('#welcome-progress');
  if(progress)progress.textContent=number<=3?'Question '+number+' of 3':'Welcome to your table';
}
function finishWelcome({scroll=true}={}){
  const branch=welcomeAnswers.branch;
  const course=welcomeAnswers.course||'bits';
  openCourse(course);
  localStorage.setItem('plusu-welcome',JSON.stringify(welcomeAnswers));
  gate.classList.add('complete');
  steps.forEach(step=>step.hidden=true);
  welcomeResult.hidden=false;
  counter.hidden=false;
  const branchWords=branch==='awd'?'Whole Donuts':branch==='tnc'?'The Nurtured Chef':'the whole +U table';
  welcomeResult.querySelector('strong').textContent='Your seat is ready at '+branchWords+'.';
  welcomeResult.querySelector('span').textContent='We opened '+course.toUpperCase()+' first. Change courses anytime.';
  showQuestion(4);
  if(scroll)counter.scrollIntoView({behavior:'smooth',block:'start'});
}
document.querySelectorAll('[data-answer]').forEach(button=>{
  button.addEventListener('click',()=>{
    const step=button.closest('[data-question]');
    welcomeAnswers[step.dataset.key]=button.dataset.answer;
    const next=Number(step.dataset.question)+1;
    if(next>3)finishWelcome();else showQuestion(next);
  });
});

const savedWelcome=localStorage.getItem('plusu-welcome');
if(savedWelcome){
  try{Object.assign(welcomeAnswers,JSON.parse(savedWelcome));finishWelcome({scroll:false})}catch(e){showQuestion(1)}
}else if(gate){showQuestion(1)}

const restart=document.querySelector('#restart-welcome');
if(restart)restart.addEventListener('click',()=>{
  localStorage.removeItem('plusu-welcome');
  Object.keys(welcomeAnswers).forEach(key=>delete welcomeAnswers[key]);
  welcomeResult.hidden=true;
  counter.hidden=true;
  gate.classList.remove('complete');
  showQuestion(1);
  gate.scrollIntoView({behavior:'smooth'});
});

const passButton=document.querySelector('#make-pass');
const passCard=document.querySelector('#pass-card');
const passImage=document.querySelector('#pass-qr');
const passName=document.querySelector('#pass-name');
const passLink=document.querySelector('#open-pass-link');
const copyPassLink=document.querySelector('#copy-pass-link');
const passFallback=document.querySelector('#pass-fallback');
function validPass(value){
  return /^\+U-[A-Z0-9]+-[A-Z0-9]{4}$/.test(value);
}
function passUrl(pass){
  return 'https://wenevergonnaclose.com/?u='+encodeURIComponent(pass);
}
function syncPassFromQuery(){
  const params=new URLSearchParams(location.search);
  const incoming=params.get('u');
  if(!incoming)return;
  const pass=incoming.trim();
  if(!validPass(pass))return;
  localStorage.setItem('plusu-pass',pass);
  localStorage.setItem('plusu-last-visit',new Date().toISOString());
}
syncPassFromQuery();
function getPass(){
  let pass=localStorage.getItem('plusu-pass');
  if(!pass){
    const stamp=Date.now().toString(36).toUpperCase();
    const spice=Math.random().toString(36).slice(2,6).toUpperCase();
    pass='+U-'+stamp+'-'+spice;
    localStorage.setItem('plusu-pass',pass);
  }
  return pass;
}
function renderPass(renderQr){
  if(!passCard||!passImage||!passName||!passButton)return;
  const pass=getPass();
  const url=passUrl(pass);
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
  passButton.textContent=renderQr?'Refresh your +U QR':'Show your +U QR';
  if(copyPassLink)copyPassLink.textContent='Copy my private +U link';
  if(passFallback)passFallback.hidden=true;
  localStorage.setItem('plusu-last-visit',new Date().toISOString());
}
if(passButton)passButton.addEventListener('click',()=>renderPass(true));
if(localStorage.getItem('plusu-pass')&&passButton)renderPass(false);
if(passImage&&passFallback)passImage.addEventListener('error',()=>{passFallback.hidden=false});
if(passImage&&passFallback)passImage.addEventListener('load',()=>{passFallback.hidden=true});
if(copyPassLink)copyPassLink.addEventListener('click',async()=>{
  const pass=getPass();
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
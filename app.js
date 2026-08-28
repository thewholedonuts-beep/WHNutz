const links=[...document.querySelectorAll('[data-branch]')];
const store=document.querySelector('#branch-store');
function safeGet(key){
  try{return localStorage.getItem(key)}catch(e){return null}
}
function safeSet(key,value){
  try{localStorage.setItem(key,value)}catch(e){}
}
function safeRemove(key){
  try{localStorage.removeItem(key)}catch(e){}
}
const stores={
  awd:['Browse the .buzz store ↗','https://wholedonuts.buzz/'],
  tnc:['Browse the chef store ↗','https://thenutur3dchef.com/']
};

function syncBranch(){
  const id=location.hash.slice(1);
  links.forEach(a=>a.classList.toggle('active',a.dataset.branch===id));
  if(stores[id]){store.textContent=stores[id][0];store.href=stores[id][1]}
  else{store.textContent='Open the menu';store.href='#home'}
}

const menuButtons=[...document.querySelectorAll('[data-menu]')];
const menuPanels=[...document.querySelectorAll('[data-course]')];
function openCourse(id){
  menuButtons.forEach(button=>{
    const active=button.dataset.menu===id;
    button.classList.toggle('active',active);
    button.setAttribute('aria-selected',String(active));
    button.tabIndex=active?0:-1;
  });
  menuPanels.forEach(panel=>panel.hidden=panel.dataset.course!==id);
}
menuButtons.forEach(button=>button.addEventListener('click',()=>openCourse(button.dataset.menu)));
menuButtons.forEach((button,index)=>{
  button.addEventListener('keydown',event=>{
    if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;
    event.preventDefault();
    const last=menuButtons.length-1;
    let next=index;
    if(event.key==='ArrowRight')next=index===last?0:index+1;
    if(event.key==='ArrowLeft')next=index===0?last:index-1;
    if(event.key==='Home')next=0;
    if(event.key==='End')next=last;
    const target=menuButtons[next];
    openCourse(target.dataset.menu);
    target.focus();
  });
});
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
  safeSet('plusu-welcome',JSON.stringify(welcomeAnswers));
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

const savedWelcome=safeGet('plusu-welcome');
if(savedWelcome){
  try{Object.assign(welcomeAnswers,JSON.parse(savedWelcome));finishWelcome({scroll:false})}catch(e){safeRemove('plusu-welcome');showQuestion(1)}
}else if(gate){showQuestion(1)}

const restart=document.querySelector('#restart-welcome');
if(restart)restart.addEventListener('click',()=>{
  safeRemove('plusu-welcome');
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
const passStatus=document.querySelector('#pass-status');
const qrUnavailableMessage='QR image temporarily unavailable. Your +U pass code is still valid below.';
const qrOnDemandMessage='Pass ready on this device. Tap "Load your +U QR" to load your QR.';
function validPass(value){
  return /^\+U-[A-Z0-9]+-[A-Z0-9]{4}$/.test(value||'');
}
function getPass(){
  let pass=safeGet('plusu-pass');
  if(!validPass(pass)){
    const stamp=Date.now().toString(36).toUpperCase();
    const spice=Math.random().toString(36).slice(2,6).toUpperCase();
    pass='+U-'+stamp+'-'+spice;
    safeSet('plusu-pass',pass);
  }
  return pass;
}
function currentPass(){
  const storedPass=safeGet('plusu-pass');
  if(validPass(storedPass))return storedPass;
  return getPass();
}
function showPass(){
  const pass=currentPass();
  const url='https://justplususa.org/?u='+encodeURIComponent(pass);
  passName.textContent=pass;
  if(passStatus)passStatus.hidden=true;
  if(passImage){
    passImage.hidden=true;
    passImage.onload=()=>{
      passImage.hidden=false;
    };
    passImage.onerror=()=>{
      passImage.hidden=true;
      if(passStatus){
        passStatus.textContent=qrUnavailableMessage;
        passStatus.hidden=false;
      }
    };
    passImage.src='https://api.qrserver.com/v1/create-qr-code/?size=720x720&data='+encodeURIComponent(url);
  }
  passCard.hidden=false;
  passButton.textContent='Your +U change is ready';
  safeSet('plusu-last-visit',new Date().toISOString());
}
function showSavedPass(){
  const pass=safeGet('plusu-pass');
  if(!validPass(pass)||!passCard||!passName)return;
  passName.textContent=pass;
  passCard.hidden=false;
  if(passImage){
    passImage.hidden=true;
    passImage.removeAttribute('src');
  }
  if(passStatus){
    passStatus.textContent=qrOnDemandMessage;
    passStatus.hidden=false;
  }
  if(passButton)passButton.textContent='Load your +U QR';
}
if(passButton)passButton.addEventListener('click',showPass);
showSavedPass();

addEventListener('hashchange',syncBranch);
syncBranch();
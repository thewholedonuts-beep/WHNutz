const links=[...document.querySelectorAll('[data-branch]')];
const store=document.querySelector('#branch-store');
const payment=['Pay $wholedonuts','https://cash.app/$wholedonuts'];
const stores={tnc:payment,awd:payment};

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

const passButton=document.querySelector('#make-pass');
const passCard=document.querySelector('#pass-card');
const passImage=document.querySelector('#pass-qr');
const passName=document.querySelector('#pass-name');
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
function showPass(){
  const pass=getPass();
  const url='https://wenevergonnaclose.com/?u='+encodeURIComponent(pass);
  passName.textContent=pass;
  passImage.src='https://api.qrserver.com/v1/create-qr-code/?size=720x720&data='+encodeURIComponent(url);
  passCard.hidden=false;
  passButton.textContent='Your +U change is ready';
  localStorage.setItem('plusu-last-visit',new Date().toISOString());
}
if(passButton)passButton.addEventListener('click',showPass);
if(localStorage.getItem('plusu-pass')&&passButton)showPass();

addEventListener('hashchange',syncBranch);
syncBranch();
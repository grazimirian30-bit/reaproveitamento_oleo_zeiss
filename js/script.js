/* TAREFA 9 — PROGRAMAÇÃO: comportamento do menu, navegação e quiz. */
const toggle=document.querySelector(".menu-toggle");const menu=document.querySelector("#menu");
toggle?.addEventListener("click",()=>{const open=menu.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open))});
const current=location.pathname.split("/").pop()||"index.html";document.querySelectorAll("#menu a").forEach(link=>{if(link.getAttribute("href")===current)link.setAttribute("aria-current","page")});
document.querySelectorAll("[data-quiz]").forEach(button=>button.addEventListener("click",()=>{const target=document.getElementById("quiz-resultado");if(target)target.textContent=button.dataset.quiz==="correct"?"Correto! Guarde o óleo frio em recipiente fechado e procure um ponto de coleta.":"Tente novamente: óleo usado não deve ser despejado na pia nem na natureza."}));

/* Desativa o cache offline antigo para que o celular receba a versão atualizada. */
if ("serviceWorker" in navigator) { navigator.serviceWorker.getRegistrations().then(registrations=>registrations.forEach(reg=>reg.unregister())).catch(()=>{}); }
if ("caches" in window) { caches.keys().then(keys=>keys.filter(key=>key.startsWith("oleo-consciente-")).forEach(key=>caches.delete(key))).catch(()=>{}); }


/* As áreas clicáveis fazem parte das próprias imagens. Nenhum menu duplicado é inserido por JavaScript. */

/* MOBILE_READER_V35: os infográficos horizontais viram quadros verticais ampliados.
   Não modifica a capa e conserva os cartazes originais para computador. */
(function(){
 const media=window.matchMedia('(max-width:700px)');
 if(!media.matches)return;
 const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
 const cfg={
  'armazenamento.html':{steps:['Espere o óleo esfriar','Retire os resíduos','Armazene em garrafa resistente','Feche e identifique','Guarde em local seguro'],hrefs:['#passo-1','#passo-2','#passo-3','#passo-4','#passo-5']},
  'coleta.html':{steps:['Separe o óleo usado','Entregue em ponto de coleta','Coleta e transporte','Processamento','Novos produtos'],hrefs:['armazenamento.html','coleta.html','coleta.html','coleta.html','coleta.html']},
  'dicas.html':{steps:['Armazene com segurança','Entregue para reciclagem','Transforme com responsabilidade','Evite desperdício','Compartilhe a ideia'],hrefs:['#armazenar','#entregar','#transformar','#evitar','#compartilhar']}
 };
 const figure=document.querySelector('.impactos-poster,.armazenamento-poster,.coleta-poster,.educacao-poster,.dicas-poster-wide,.projeto-poster,.trail-poster');
 const original=figure?.querySelector('img');
 if(!figure||!original)return;
 const current=cfg[path];
 function card(reader,{title,x,y,w,h,href},i){
  const block=document.createElement(href?'a':'article');
  block.className='mobile-infographic-card';
  if(href){block.href=href;if(path==='dicas.html'&&href.startsWith('#'))block.classList.add('dicas-hotspot')}
  const titleNode=document.createElement('h3');titleNode.textContent=title;block.appendChild(titleNode);
  const crop=document.createElement('div');crop.className='mobile-infographic-crop';
  crop.style.aspectRatio=String((w*original.naturalWidth)/(h*original.naturalHeight));
  const picture=document.createElement('img');picture.src=original.currentSrc||original.src;
  picture.alt=title;picture.loading=i<2?'eager':'lazy';
  picture.style.width=(100/w)+'%';picture.style.maxWidth='none';
  picture.style.left=(-x/w*100)+'%';picture.style.top=(-y/h*100)+'%';
  picture.style.height='auto';picture.style.position='absolute';
  crop.appendChild(picture);block.appendChild(crop);reader.appendChild(block);
 }
 function build(){
  if(!media.matches||!original.naturalWidth||figure.nextElementSibling?.classList.contains('mobile-infographic-reader'))return;
  const reader=document.createElement('section');reader.className='mobile-infographic-reader';
  reader.setAttribute('aria-label','Infográfico ampliado para leitura no celular');
  const heading=document.createElement('h2');heading.textContent='Ilustrações ampliadas';reader.appendChild(heading);
  const p=document.createElement('p');p.textContent='Veja os desenhos e orientações em tamanho maior, um quadro de cada vez.';reader.appendChild(p);
  if(current){
   card(reader,{title:'Entenda o processo',x:0,y:.12,w:1,h:.29},0);
   current.steps.forEach((name,i)=>card(reader,{title:(i+1)+'. '+name,x:i*.2,y:.41,w:.2,h:.36,href:current.hrefs[i]},i+1));
   card(reader,{title:'Orientações e cuidados',x:0,y:.77,w:.5,h:.23},6);
   card(reader,{title:'Dicas importantes',x:.5,y:.77,w:.5,h:.23},7);
  }else{
   for(let row=0;row<3;row++)for(let col=0;col<2;col++){
    let href=(path==='projeto.html'&&row===2&&col===1)?'trilha.html':undefined;
    card(reader,{title:href?'Acessar a Trilha Consciente':'Detalhe ampliado '+(row*2+col+1),x:col*.5,y:row/3,w:.5,h:1/3,href},row*2+col);
   }
  }
  figure.insertAdjacentElement('afterend',reader);
  document.documentElement.classList.add('mobile-reader-ready');
 }
 if(original.complete&&original.naturalWidth)build();else original.addEventListener('load',build,{once:true});
})();

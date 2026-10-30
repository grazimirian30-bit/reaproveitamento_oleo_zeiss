/* TAREFA 9 — PROGRAMAÇÃO: comportamento do menu, navegação e quiz. */
const toggle=document.querySelector(".menu-toggle");const menu=document.querySelector("#menu");
toggle?.addEventListener("click",()=>{const open=menu.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open))});
const current=location.pathname.split("/").pop()||"index.html";document.querySelectorAll("#menu a").forEach(link=>{if(link.getAttribute("href")===current)link.setAttribute("aria-current","page")});
document.querySelectorAll("[data-quiz]").forEach(button=>button.addEventListener("click",()=>{const target=document.getElementById("quiz-resultado");if(target)target.textContent=button.dataset.quiz==="correct"?"Correto! Guarde o óleo frio em recipiente fechado e procure um ponto de coleta.":"Tente novamente: óleo usado não deve ser despejado na pia nem na natureza."}));

/* Desativa o cache offline antigo para que o celular receba a versão atualizada. */
if ("serviceWorker" in navigator) { navigator.serviceWorker.getRegistrations().then(registrations=>registrations.forEach(reg=>reg.unregister())).catch(()=>{}); }
if ("caches" in window) { caches.keys().then(keys=>keys.filter(key=>key.startsWith("oleo-consciente-")).forEach(key=>caches.delete(key))).catch(()=>{}); }


/* Cartões de navegação maiores e acessíveis no celular (sem duplicação no desktop). */
(function(){
 const holder=document.querySelector('.interactive-cover-image, .impactos-poster, .armazenamento-poster, .coleta-poster, .educacao-poster, .dicas-poster-wide, .projeto-poster');
 if(!holder||document.querySelector('.mobile-topic-links'))return;
 const topics=[['impactos.html','🌍 Impactos ambientais'],['armazenamento.html','🧴 Armazenamento correto'],['coleta.html','♻️ Coleta e reciclagem'],['educacao.html','🌱 Educação ambiental'],['dicas.html','💡 Dicas sustentáveis'],['projeto.html','🏢 Projeto ZEISS']];
 const nav=document.createElement('nav');nav.className='mobile-topic-links';nav.setAttribute('aria-label','Acessos para celular');
 const links=holder.classList.contains('interactive-cover-image')?topics:[['index.html','🏠 Início'],...topics];
 for(const [href,label] of links){const a=document.createElement('a');a.href=href;a.textContent=label;if(current===href)a.setAttribute('aria-current','page');nav.appendChild(a)}
 holder.insertAdjacentElement('afterend',nav);
})();

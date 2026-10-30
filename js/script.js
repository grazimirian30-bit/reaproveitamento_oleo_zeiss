/* TAREFA 9 — PROGRAMAÇÃO: comportamento do menu, navegação e quiz. */
const toggle=document.querySelector(".menu-toggle");const menu=document.querySelector("#menu");
toggle?.addEventListener("click",()=>{const open=menu.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open))});
const current=location.pathname.split("/").pop()||"index.html";document.querySelectorAll("#menu a").forEach(link=>{if(link.getAttribute("href")===current)link.setAttribute("aria-current","page")});
document.querySelectorAll("[data-quiz]").forEach(button=>button.addEventListener("click",()=>{const target=document.getElementById("quiz-resultado");if(target)target.textContent=button.dataset.quiz==="correct"?"Correto! Guarde o óleo frio em recipiente fechado e procure um ponto de coleta.":"Tente novamente: óleo usado não deve ser despejado na pia nem na natureza."}));

/* Desativa o cache offline antigo para que o celular receba a versão atualizada. */
if ("serviceWorker" in navigator) { navigator.serviceWorker.getRegistrations().then(registrations=>registrations.forEach(reg=>reg.unregister())).catch(()=>{}); }
if ("caches" in window) { caches.keys().then(keys=>keys.filter(key=>key.startsWith("oleo-consciente-")).forEach(key=>caches.delete(key))).catch(()=>{}); }


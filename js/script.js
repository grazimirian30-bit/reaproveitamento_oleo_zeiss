/* TAREFA 9 — PROGRAMAÇÃO: comportamento do menu, navegação e quiz. */
const toggle=document.querySelector(".menu-toggle");const menu=document.querySelector("#menu");
toggle?.addEventListener("click",()=>{const open=menu.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open))});
const current=location.pathname.split("/").pop()||"index.html";document.querySelectorAll("#menu a").forEach(link=>{if(link.getAttribute("href")===current)link.setAttribute("aria-current","page")});
document.querySelectorAll("[data-quiz]").forEach(button=>button.addEventListener("click",()=>{const target=document.getElementById("quiz-resultado");if(target)target.textContent=button.dataset.quiz==="correct"?"Correto! Guarde o óleo frio em recipiente fechado e procure um ponto de coleta.":"Tente novamente: óleo usado não deve ser despejado na pia nem na natureza."}));

/* Desativa o cache offline antigo para que o celular receba a versão atualizada. */
if ("serviceWorker" in navigator) { navigator.serviceWorker.getRegistrations().then(registrations=>registrations.forEach(reg=>reg.unregister())).catch(()=>{}); }
if ("caches" in window) { caches.keys().then(keys=>keys.filter(key=>key.startsWith("oleo-consciente-")).forEach(key=>caches.delete(key))).catch(()=>{}); }


/* As áreas clicáveis fazem parte das próprias imagens. Nenhum menu duplicado é inserido por JavaScript. */

/* PFE 2026: questões formativas acessíveis, sem coleta de dados pessoais.
   Os botões são nativos e respondem a clique, Enter e Espaço. */
document.querySelectorAll("[data-pfe-atividade]").forEach(atividade=>{
  const escolhas=[...atividade.querySelectorAll("[data-pfe-escolha]")];
  const resultado=atividade.querySelector("[data-pfe-resultado]");
  if(!resultado||!escolhas.length)return;
  escolhas.forEach(botao=>botao.addEventListener("click",()=>{
    const correto=botao.dataset.correto==="sim";
    escolhas.forEach(x=>x.setAttribute("aria-pressed",String(x===botao)));
    resultado.textContent=(correto?"✅ Boa escolha! ":"💡 Vamos revisar: ")+(botao.dataset.explicacao||"Confira as orientações desta página.");
    resultado.dataset.resultado=correto?"acerto":"revisar";
    resultado.hidden=false;
  }));
});

/* Jogo educativo: organizar o armazenamento sem coletar dados. */
document.querySelectorAll("[data-pfe-ordem]").forEach(jogo=>{
  const botoes=[...jogo.querySelectorAll("[data-etapa]")];
  const aviso=jogo.querySelector("[data-pfe-ordem-retorno]");
  const progresso=jogo.querySelector("[data-pfe-ordem-progresso]");
  const reiniciar=jogo.querySelector("[data-pfe-ordem-reiniciar]");
  let etapa=1;
  const atualizar=()=>{
    progresso.textContent=etapa<=5?"Etapa "+etapa+" de 5":"Jogo concluído · 5 de 5 etapas";
  };
  botoes.forEach(botao=>botao.addEventListener("click",()=>{
    const escolha=Number(botao.dataset.etapa);
    if(escolha<etapa)return;
    if(escolha!==etapa){
      aviso.textContent="💡 Essa ação faz parte do processo, mas ainda não é a próxima etapa. Confira a sequência e tente novamente.";
      aviso.dataset.resultado="revisar";
      return;
    }
    botao.disabled=true;
    botao.classList.add("pfe-etapa-concluida");
    etapa+=1;
    aviso.dataset.resultado="acerto";
    aviso.textContent=etapa>5?"🏆 Parabéns! Você completou a sequência segura. Confira sempre as orientações do ponto de coleta.":"✅ Etapa correta! Escolha a próxima ação.";
    atualizar();
  }));
  reiniciar?.addEventListener("click",()=>{
    etapa=1;
    botoes.forEach(botao=>{botao.disabled=false;botao.classList.remove("pfe-etapa-concluida")});
    aviso.textContent="Escolha a primeira etapa para começar.";
    aviso.dataset.resultado="";
    atualizar();
  });
  atualizar();
});

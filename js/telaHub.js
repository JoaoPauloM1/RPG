import { exibirTela } from "../scripts.js";
import { aventura } from "./aventura.js";
import { descanso } from "./descanso.js";
import { adicionarAtributos } from "./atributos.js";

let dias = 0;

export function telaHub(nomePersonagem, classeEscolhida, vida, estamina, nivel, xp) {
    
    //Subir de nível
    if (xp >= 30) {
        xp = 0;
        nivel++;
        alert("Você subiu de nível!");
    }

    const tela = document.getElementById("tela");
    tela.innerHTML = '';
    dias++;

    // Div que contém tudo
    const screen = document.createElement("div");
    screen.classList.add("telaHub");

    // Div dos atributos
    const atributosDiv = document.createElement("div");
    atributosDiv.classList.add("atributosDiv");
    screen.appendChild(atributosDiv);

    // Adiciona os atributos na tela
    adicionarAtributos(atributosDiv, vida, estamina, nivel, xp);

    // Container do personagem e nome
    const containerPersonagem = document.createElement("div");
    containerPersonagem.classList.add("containerPersonagem");
    screen.appendChild(containerPersonagem);

    const nomedoPersonagem = document.createElement("span");
    nomedoPersonagem.textContent = nomePersonagem;
    nomedoPersonagem.classList.add("nomePersonagem");
    containerPersonagem.appendChild(nomedoPersonagem);

    const spritePersonagem = document.createElement("img");
    spritePersonagem.src = `./img/${classeEscolhida.toLowerCase()}.gif`;
    spritePersonagem.classList.add("spritePersonagem");
    containerPersonagem.appendChild(spritePersonagem);

    // Div que contém os botões
    const containerBotao = document.createElement("div");
    containerBotao.classList.add("containerBotao");
    screen.appendChild(containerBotao);

    // Botão aventura
    const botaoAventura = document.createElement("button");
    botaoAventura.type = "button";
    botaoAventura.textContent = "Aventura";
    containerBotao.appendChild(botaoAventura);
    botaoAventura.addEventListener("click", () => {
        if (estamina > 0) {
            tela.innerHTML = '';
            estamina -= 1;
            aventura(nomePersonagem, classeEscolhida, vida, estamina, nivel, xp);
        } else {
            alert("Estamina insuficiente, descanse para se recuperar.");
        }
    });

    // Botão descanso
    const botaoDescanso = document.createElement("button");
    botaoDescanso.type = "button";
    botaoDescanso.textContent = "Descanso";
    containerBotao.appendChild(botaoDescanso);
    botaoDescanso.addEventListener("click", () => {
        descanso(nomePersonagem, classeEscolhida, vida, estamina, nivel, xp);
    });

    // Dias
    const diasSpan = document.createElement("span");
    diasSpan.textContent = "Dia: " + dias;
    diasSpan.classList.add("dias");
    screen.appendChild(diasSpan);

    exibirTela(screen);
}
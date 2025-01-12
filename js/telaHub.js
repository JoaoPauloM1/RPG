// Note: Variable and functions names are in Portuguese as the project was initially developed this way.

import { exibirTela } from "../scripts.js";
import { aventura } from "./aventura.js";
import { descanso } from "./descanso.js";
import { adicionarAtributos } from "./atributos.js";

let dias = 0;

export function telaHub(nomePersonagem, classeEscolhida, vida, estamina, nivel, xp) {
    
    if (xp >= 30) {
        xp = 0;
        nivel++;
        const somNivel = new Audio('/sons/som-nivel.mp3');
        somNivel.volume = 0.15;
        somNivel.play();
        alert("You leveled up! +4 max health.");
    }

    const tela = document.getElementById("tela");
    tela.innerHTML = '';
    dias++;

    const screen = document.createElement("div");
    screen.classList.add("telaHub");

    const atributosDiv = document.createElement("div");
    atributosDiv.classList.add("atributosDiv");
    screen.appendChild(atributosDiv);

    adicionarAtributos(atributosDiv, vida, estamina, nivel, xp);

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

    const containerBotao = document.createElement("div");
    containerBotao.classList.add("containerBotao");
    screen.appendChild(containerBotao);

    const botaoAventura = document.createElement("button");
    botaoAventura.type = "button";
    botaoAventura.textContent = "Adventure";
    containerBotao.appendChild(botaoAventura);
    botaoAventura.addEventListener("click", () => {
        if (estamina > 0) {
            tela.innerHTML = '';
            estamina -= 1;
            aventura(nomePersonagem, classeEscolhida, vida, estamina, nivel, xp);
        } else {
            alert("Insufficient stamina, rest to recover.");
        }
    });

    const botaoDescanso = document.createElement("button");
    botaoDescanso.type = "button";
    botaoDescanso.textContent = "Rest";
    containerBotao.appendChild(botaoDescanso);
    botaoDescanso.addEventListener("click", () => {
        descanso(nomePersonagem, classeEscolhida, vida, estamina, nivel, xp);
    });

    const diasSpan = document.createElement("span");
    diasSpan.textContent = "Day: " + dias;
    diasSpan.classList.add("dias");
    screen.appendChild(diasSpan);

    exibirTela(screen);
}
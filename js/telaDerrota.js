// Note: Variable and functions names are in Portuguese as the project was initially developed this way.

import { exibirTela } from "../scripts.js";

export function telaDerrota(dias) {
    const tela = document.getElementById("tela");
    tela.innerHTML = '';

    const derrotaDiv = document.createElement("div");
    derrotaDiv.classList.add("telaDerrota");

    const mensagem = document.createElement("span");
    mensagem.textContent = "You have died!";
    mensagem.classList.add("mensagemDerrota");

    derrotaDiv.appendChild(mensagem);
    tela.appendChild(derrotaDiv);

    setTimeout(() => {
        location.reload()
    }, 4000);

    exibirTela(screen);
}
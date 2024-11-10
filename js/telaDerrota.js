import { exibirTela } from "../scripts.js";

export function telaDerrota() {
    const tela = document.getElementById("tela");
    tela.innerHTML = '';

    // Cria a div principal da tela de derrota
    const derrotaDiv = document.createElement("div");
    derrotaDiv.classList.add("telaDerrota");

    // Cria a mensagem "Você morreu"
    const mensagem = document.createElement("span");
    mensagem.textContent = "Você morreu";
    mensagem.classList.add("mensagemDerrota");

    // Adiciona a mensagem à tela
    derrotaDiv.appendChild(mensagem);
    tela.appendChild(derrotaDiv);

    exibirTela(screen);
}
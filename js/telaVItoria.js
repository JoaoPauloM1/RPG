import { exibirTela } from "../scripts.js";

export function telaVitoria() {
    const tela = document.getElementById("tela");
    tela.innerHTML = '';  // Limpa qualquer conteúdo existente na tela.

    // Cria a div principal da tela de vitoria
    const vitoriaDiv = document.createElement("div");
    vitoriaDiv.classList.add("telaVitoria");

    // Cria a mensagem "Você venceu"
    const mensagem = document.createElement("span");
    mensagem.textContent = "Você venceu! Parabéns!";
    mensagem.classList.add("mensagemVitoria");

    // Adiciona a mensagem à tela
    vitoriaDiv.appendChild(mensagem);
    tela.appendChild(vitoriaDiv);

    // Exibe a tela de vitória final
    exibirTela(vitoriaDiv);
}
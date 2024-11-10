import { exibirTela } from "../scripts.js";
import { telaInicial } from "./telaInicial.js";

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

    //Reiniciar jogo
    setTimeout(() => {
        tela.innerHTML = '';
        telaInicial();
    }, 4000);

    exibirTela(screen);
}
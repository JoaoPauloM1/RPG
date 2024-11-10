import { telaHub } from "./telaHub.js";

export function iniciarJogo(nomePersonagem, classeEscolhida) {
    let vida = 20;
    let estamina = 3;
    let nivel = 5;
    let xp = 0;

    const tela = document.getElementById("tela");
    const telaInicial = document.querySelector(".telaInicial");
    tela.removeChild(telaInicial);
    telaHub(nomePersonagem, classeEscolhida, vida, estamina, nivel, xp);
}
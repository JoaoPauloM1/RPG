// Note: Variable and functions names are in Portuguese as the project was initially developed this way.

import { telaHub } from "./telaHub.js";

export function iniciarJogo(nomePersonagem, classeEscolhida) {
    let vida = 20;
    let estamina = 3;
    let nivel = 0;
    let xp = 0;

    const tela = document.getElementById("tela");
    const telaInicial = document.querySelector(".telaInicial");
    tela.removeChild(telaInicial);
    telaHub(nomePersonagem, classeEscolhida, vida, estamina, nivel, xp);
}
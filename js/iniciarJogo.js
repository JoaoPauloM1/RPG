import { telaHub } from "./telaHub.js";

export function iniciarJogo(nomePersonagem, classeEscolhida) {
    let vida, estamina;
    vida = 20;
    estamina = 3;

const tela = document.getElementById("tela");
const telaInicial = document.querySelector(".telaInicial");
tela.removeChild(telaInicial);
telaHub(nomePersonagem, classeEscolhida, vida, estamina);
}
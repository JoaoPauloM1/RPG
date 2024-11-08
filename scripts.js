import { telaInicial } from "./js/telaInicial.js"; 

const tela = document.getElementById("tela");

export function exibirTela(screen) {
    tela.appendChild(screen);
}

telaInicial();
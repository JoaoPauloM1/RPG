import { telaHub } from "./telaHub.js";
import { exibirTela } from "../scripts.js";

export function descanso(nomePersonagem, classeEscolhida, vida, mana, forca) {
    const tela = document.getElementById("tela");
    tela.innerHTML = '';

    // Cria a div principal que contém tudo
    const screen = document.createElement("div");
    screen.classList.add("telaDescanso"); // Background

    //Limpa a tela e volta para telaHub
    tela.innerHTML = '';
    telaHub(nomePersonagem, classeEscolhida, vida, mana, forca);

    //Exibe a tela
    exibirTela(screen);
}
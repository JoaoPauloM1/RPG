import { telaHub } from "./telaHub.js";
import { exibirTela } from "../scripts.js";

export function aventura(nomePersonagem, classeEscolhida, vida, mana, forca) {
    const tela = document.getElementById("tela");
    tela.innerHTML = '';

    // Cria a div principal que contém tudo
    const screen = document.createElement("div");
    screen.classList.add("telaAventura"); // Background

    // Div dos atributos
    const atributosDiv = document.createElement("div");
    atributosDiv.classList.add("atributosDiv");
    screen.appendChild(atributosDiv);

    //Limpa a tela e volta para telaHub
    tela.innerHTML = '';
    telaHub(nomePersonagem, classeEscolhida, vida, mana, forca);

    //Exibe a tela
    exibirTela(screen);
}
import { exibirTela } from "../scripts.js";

export function telaHub(nomePersonagem, classeEscolhida, vida, mana, forca) {
   // Div que contém tudo
    const screen = document.createElement("div");
    screen.classList.add("telaHub"); // Background
    exibirTela(screen);
}
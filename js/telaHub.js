import { exibirTela } from "../scripts.js";

export function telaHub() {
   // Div que contém tudo
    const screen = document.createElement("div");
    screen.classList.add("telaHub"); // Background
    exibirTela(screen);
}
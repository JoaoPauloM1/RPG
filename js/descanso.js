import { telaHub } from "./telaHub.js";
import { exibirTela } from "../scripts.js";

export function descanso(nomePersonagem, classeEscolhida, vida, estamina) {
    const tela = document.getElementById("tela");
    tela.innerHTML = '';

    // Cria a div principal que contém tudo
    const screen = document.createElement("div");
    screen.classList.add("telaDescanso");

    //Recupera vida e estamina
    vida += 5;
    estamina++;
    if (vida > 20) {
        vida = 20;
    }
    if (estamina > 3) {
        estamina = 3;
    }

    setTimeout(() => {
        tela.innerHTML = '';
        telaHub(nomePersonagem, classeEscolhida, vida, estamina);
    }, 5000);

    //Exibe a tela
    exibirTela(screen);
}
import { telaHub } from "./telaHub.js";
import { exibirTela } from "../scripts.js";

export function descanso(nomePersonagem, classeEscolhida, vida, estamina, nivel, xp) {
    const tela = document.getElementById("tela");
    tela.innerHTML = '';

    // Cria a div principal que contém tudo
    const screen = document.createElement("div");
    screen.classList.add("telaDescanso");

    //Recupera vida e estamina
    vida += 10;
    estamina++;
    const vidaMaxima = 20 + ((nivel - 1) * 4);
    if (vida > vidaMaxima) {
    vida = vidaMaxima;
    }
    if (estamina > 3) {
        estamina = 3;
    }

    setTimeout(() => {
        tela.innerHTML = '';
        telaHub(nomePersonagem, classeEscolhida, vida, estamina, nivel, xp);
    }, 2000);

    //Exibe a tela
    exibirTela(screen);
}
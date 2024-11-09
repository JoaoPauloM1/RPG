import { telaHub } from "./telaHub.js";

export function iniciarJogo(nomePersonagem, classeEscolhida) {
    let vida, mana, forca;

    // Definindo atributos com base na classe escolhida
    if (classeEscolhida === "Guerreiro") {
        vida = 10;
        mana = 5;
        forca = 15;
    } else if (classeEscolhida === "Mago") {
        vida = 8;
        mana = 17;
        forca = 5;
    } else if (classeEscolhida === "Arqueiro") {
        vida = 10;
        mana = 10;
        forca = 10;
    }

const tela = document.getElementById("tela");
const telaInicial = document.querySelector(".telaInicial");
tela.removeChild(telaInicial);
telaHub(nomePersonagem, classeEscolhida, vida, mana, forca);
}
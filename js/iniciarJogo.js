import { telaHub } from "./telaHub.js";

export function iniciarJogo(nomePersonagem, classeEscolhida) {
    let vida, mana, forca;

    // Definindo atributos com base na classe escolhida
    if (classeEscolhida === "Guerreiro") {
        vida = 10;
        mana = 5;
        forca = 15;
    } else if (classeEscolhida === "Mago") {
        vida = 5;
        mana = 15;
        forca = 5;
    } else if (classeEscolhida === "Arqueiro") {
        vida = 8;
        mana = 10;
        forca = 10;
    }

console.log(`Personagem criado: Nome - ${nomePersonagem}, Classe - ${classeEscolhida}, Vida - ${vida}, Mana - ${mana}, Força - ${forca}`);
const tela = document.getElementById("tela");
const telaInicial = document.querySelector(".telaInicial");
tela.removeChild(telaInicial);
telaHub();
}
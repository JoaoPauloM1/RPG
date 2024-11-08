// Importando funções
import { telaInicial } from "./js/telaInicial.js"; 

const tela = document.getElementById("tela");

export function exibirTela(screen) {
    // Limpa o conteúdo da tela para exibir uma nova tela
    tela.innerHTML = '';
    // Adiciona a nova tela ao contêiner
    tela.appendChild(screen);
}

// Inicializa a tela inicial
telaInicial();
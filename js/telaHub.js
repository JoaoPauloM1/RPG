import { exibirTela } from "../scripts.js";
import { aventura } from "./aventura.js";
import { treino } from "./treino.js";
import { descanso } from "./descanso.js";

let dias = 0;

export function telaHub(nomePersonagem, classeEscolhida, vida, mana, forca) {
    const tela = document.getElementById("tela");
    tela.innerHTML = '';

    // Cria a div principal que contém tudo
    const screen = document.createElement("div");
    screen.classList.add("telaHub"); // Background

    // Div dos atributos
    const atributosDiv = document.createElement("div");
    atributosDiv.classList.add("atributosDiv");
    screen.appendChild(atributosDiv);

    // Função para criar e adicionar os atributos na tela
    function adicionarAtributo(nome, valor, imagemSrc) {
        // Cria o contêiner do atributo
        const atributoContainer = document.createElement('div');
        atributoContainer.classList.add('atributosSprites');

        // Cria o elemento de imagem do atributo
        const imagem = document.createElement('img');
        imagem.src = imagemSrc;
        imagem.alt = nome;

        // Cria o elemento de texto para o valor do atributo
        const valorSpan = document.createElement('span');
        valorSpan.classList.add('atributosValor');
        valorSpan.textContent = valor; // Atribui o valor ao span

        // Adiciona a imagem e o valor ao contêiner do atributo
        atributoContainer.appendChild(imagem);
        atributoContainer.appendChild(valorSpan);

        // Adiciona o contêiner do atributo na div principal
        atributosDiv.appendChild(atributoContainer);
    }

    // Chama a função para cada atributo com as imagens correspondentes
    adicionarAtributo('Vida', vida, './img/coracao.png');
    adicionarAtributo('Força', forca, './img/forca.png');
    adicionarAtributo('Mana', mana, './img/mana.png');

    // Container do personagem e nome
    const containerPersonagem = document.createElement("div");
    containerPersonagem.classList.add("containerPersonagem");
    screen.appendChild(containerPersonagem);

    // Nome do personagem
    const nomedoPersonagem = document.createElement("span");
    nomedoPersonagem.textContent = nomePersonagem;
    nomedoPersonagem.classList.add("nomePersonagem");
    containerPersonagem.appendChild(nomedoPersonagem);

    // Sprite do personagem
    const spritePersonagem = document.createElement("img");
    if (classeEscolhida === "Guerreiro") {
        spritePersonagem.src = "./img/guerreiro.gif";
    } else if (classeEscolhida === "Mago") {
        spritePersonagem.src = "./img/mago.gif";
    } else if (classeEscolhida === "Arqueiro") {
        spritePersonagem.src = "./img/arqueiro.gif";
    }
    spritePersonagem.classList.add("spritePersonagem");
    containerPersonagem.appendChild(spritePersonagem);
    
    // Div que contém os botões
    const containerBotao = document.createElement("div");
    containerBotao.classList.add("containerBotao");
    screen.appendChild(containerBotao);

    // Botão aventura
    const botaoAventura = document.createElement("button");
    botaoAventura.type = "button";
    botaoAventura.textContent = "Aventura";
    containerBotao.appendChild(botaoAventura);
    botaoAventura.addEventListener("click", () => {
        tela.innerHTML = ''; // Limpa a tela antes de ir para a aventura
        aventura(vida, mana, forca, dias);
    });

    // Botão treino
    const botaoTreino = document.createElement("button");
    botaoTreino.type = "button";
    botaoTreino.textContent = "Treino";
    containerBotao.appendChild(botaoTreino);
    botaoTreino.addEventListener("click", () => {
        tela.innerHTML = ''; // Limpa a tela antes de ir para o treino
        treino(vida, mana, forca, dias);
    });

    // Botão descanso
    const botaoDescanso = document.createElement("button");
    botaoDescanso.type = "button";
    botaoDescanso.textContent = "Descanso";
    containerBotao.appendChild(botaoDescanso);
    botaoDescanso.addEventListener("click", () => {
        tela.innerHTML = ''; // Limpa a tela antes de ir para o descanso
        descanso(vida, mana, forca, dias);
    });

    // Dias
    const diasSpan = document.createElement("span");
    diasSpan.textContent = "Dia: " + dias;
    diasSpan.classList.add("dias");
    screen.appendChild(diasSpan);

    // Exibe a tela hub
    exibirTela(screen);
}

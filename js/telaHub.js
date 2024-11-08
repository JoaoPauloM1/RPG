import { exibirTela } from "../scripts.js";

export function telaHub(nomePersonagem, classeEscolhida, vida, mana, forca) {
   // Div que contém tudo
    const screen = document.createElement("div");
    screen.classList.add("telaHub"); // Background

    //Div dos atributos
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

    //Container do personagem e nome
    const containerPersonagem = document.createElement("div");
    containerPersonagem.classList.add("containerPersonagem");
    screen.appendChild(containerPersonagem);

    //Nome do personagem
    const nomedoPersonagem = document.createElement("span");
    nomedoPersonagem.textContent = nomePersonagem;
    nomedoPersonagem.classList.add("nomePersonagem");
    containerPersonagem.appendChild(nomedoPersonagem);

    //Sprite do personagem
    const spritePersonagem = document.createElement("img");
    if (classeEscolhida === "Guerreiro") {
        spritePersonagem.src = "./img/guerreiro.png";
    } else if (classeEscolhida === "Mago") {
        spritePersonagem.src = "./img/mago.png";
    } else if (classeEscolhida === "Arqueiro") {
        spritePersonagem.src = "./img/arqueiro.png";
    }
    spritePersonagem.classList.add("spritePersonagem")
    containerPersonagem.appendChild(spritePersonagem);
    
    // Exibe a tela inicial
    exibirTela(screen);
}
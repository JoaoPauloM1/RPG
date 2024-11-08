import { iniciarJogo } from "./iniciarJogo.js";
import { exibirTela } from "../scripts.js";

export function telaInicial() {
    // Div que contém tudo
    const screen = document.createElement("div");
    screen.classList.add("telaInicial"); // Background

    // Logo
    const logo = document.createElement("img");
    logo.src = "img/logo.png";
    logo.classList.add("logo");
    screen.appendChild(logo);

    // Formulário
    const form = document.createElement("div");
    form.classList.add("form");
    screen.appendChild(form);

    // Input do nome do personagem
    const nomeInput = document.createElement("input");
    nomeInput.type = "text";
    nomeInput.placeholder = "Digite o nome do personagem";
    nomeInput.classList.add("nome");
    form.appendChild(nomeInput);

    // Container das classes
    const classeContainer = document.createElement("div");
    classeContainer.classList.add("classe-container");
    form.appendChild(classeContainer);

    // Classes
    const classes = [
        { name: "Guerreiro", image: "./img/guerreiro.png" },
        { name: "Mago", image: "./img/mago.png" },
        { name: "Arqueiro", image: "./img/arqueiro.png" }
    ];
    
    let classeEscolhida = "";
    classes.forEach(classe => {
        // Div de cada classe
        const classeItem = document.createElement("div");
        classeItem.classList.add("classe-item");
     
        // Sprite de cada classe
        const sprite = document.createElement("img");
        sprite.src = classe.image;
        sprite.alt = classe.name;
        sprite.classList.add("sprite");
     
        // Radio de cada classe
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "classe";
        radio.value = classe.name;
        radio.id = classe.name.toLowerCase();
        radio.classList.add("radio");
     
        // Label de cada classe
        const label = document.createElement("label");
        label.setAttribute("for", radio.id);
        label.textContent = classe.name;
        label.classList.add("label");
     
        // Adicionando os filhos na ordem desejada
        classeItem.appendChild(sprite); // Adiciona a sprite
        classeItem.appendChild(radio);  // Adiciona o radio button
        classeItem.appendChild(label);  // Adiciona o label com o nome da classe
     
        // Adiciona a classe ao container
        classeContainer.appendChild(classeItem);
     });

    // Botão iniciar jogo
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = "Iniciar Jogo";
    botao.classList.add("botao-inicio");
    form.appendChild(botao);

    // Adiciona evento ao botão iniciar
    botao.addEventListener("click", () => {
        const nomePersonagem = nomeInput.value;
        const classeEscolhida = document.querySelector('input[name="classe"]:checked');

        if (nomePersonagem && classeEscolhida) {
            iniciarJogo(nomePersonagem, classeEscolhida.value);
        } else {
            alert("Por favor, insira o nome do personagem e escolha uma classe.");
        }
    });

    // Exibe a tela
    exibirTela(screen);
}
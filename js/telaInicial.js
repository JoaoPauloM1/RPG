// Note: Variable and functions names are in Portuguese as the project was initially developed this way.

import { iniciarJogo } from "./iniciarJogo.js";
import { exibirTela } from "../scripts.js";

export function telaInicial() {
    const screen = document.createElement("div");
    screen.classList.add("telaInicial");

    const logo = document.createElement("img");
    logo.src = "img/logo.png";
    logo.classList.add("logo");
    screen.appendChild(logo);

    const form = document.createElement("div");
    form.classList.add("form");
    screen.appendChild(form);

    const nomeInput = document.createElement("input");
    nomeInput.type = "text";
    nomeInput.placeholder = "Enter the character's name";
    nomeInput.classList.add("nome");
    form.appendChild(nomeInput);

    const classeContainer = document.createElement("div");
    classeContainer.classList.add("classe-container");
    form.appendChild(classeContainer);

    const classes = [
        { name: "Warrior", image: "./img/warrior.gif" },
        { name: "Mage", image: "./img/mage.gif" },
        { name: "Archer", image: "./img/archer.gif" }
    ];
    
    let classeEscolhida = "";
    classes.forEach(classe => {
        const classeItem = document.createElement("div");
        classeItem.classList.add("classe-item");
     
        const sprite = document.createElement("img");
        sprite.src = classe.image;
        sprite.alt = classe.name;
        sprite.classList.add("sprite");
     
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "classe";
        radio.value = classe.name;
        radio.id = classe.name.toLowerCase();
        radio.classList.add("radio");
     
        const label = document.createElement("label");
        label.setAttribute("for", radio.id);
        label.textContent = classe.name;
        label.classList.add("label");
     
        classeItem.appendChild(sprite);
        classeItem.appendChild(radio);
        classeItem.appendChild(label);
     
        classeContainer.appendChild(classeItem);
     });

    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = "Start Game";
    botao.classList.add("botao-inicio");
    form.appendChild(botao);

    botao.addEventListener("click", () => {
        const nomePersonagem = nomeInput.value;
        const classeEscolhida = document.querySelector('input[name="classe"]:checked');

        if (nomePersonagem && classeEscolhida) {
            iniciarJogo(nomePersonagem, classeEscolhida.value);
        } else {
            alert("Please enter the character's name and choose a class.");
        }
    });

    exibirTela(screen);

    const musica = new Audio('/sons/musica-de-fundo.mp3');
    musica.loop = true;
    musica.volume = 0.05;

    function verificarMusicaTocando() {
    if (sessionStorage.getItem('musicaTocando') === 'true') {
        musica.play().catch(error => console.error("Error playing music:", error));
        }
    }

    document.getElementById('botaoIniciarMusica').addEventListener('click', () => {
        if (musica.paused) {
        musica.play()
            .then(() => {
                sessionStorage.setItem('musicaTocando', 'true');
                document.getElementById('botaoIniciarMusica').textContent = "Stop Music";
            })
            .catch(error => console.error("Error playing music:", error));
        } else {
        musica.pause();
        sessionStorage.setItem('musicaTocando', 'false');
        document.getElementById('botaoIniciarMusica').textContent = "Start Music";
        }
    });

    verificarMusicaTocando();

    document.getElementById('botaoIniciarMusica').textContent = musica.paused ? "Start Music" : "Stop Music";
}

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
        { name: "Guerreiro", image: "./img/guerreiro.gif" },
        { name: "Mago", image: "./img/mago.gif" },
        { name: "Arqueiro", image: "./img/arqueiro.gif" }
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

    //Música
    const musica = new Audio('/sons/musica-de-fundo.mp3');
    musica.loop = true;
    musica.volume = 0.05;

    //Função para verificar se a música estava tocando antes e retomá-la
    function verificarMusicaTocando() {
    if (sessionStorage.getItem('musicaTocando') === 'true') {
        musica.play().catch(error => console.error("Erro ao tocar música:", error));
        }
    }

    //Evento de clique para ativar/desativar a música
    document.getElementById('botaoIniciarMusica').addEventListener('click', () => {
        if (musica.paused) {
        musica.play()
            .then(() => {
                sessionStorage.setItem('musicaTocando', 'true');
                document.getElementById('botaoIniciarMusica').textContent = "Parar Música";
            })
            .catch(error => console.error("Erro ao tocar música:", error));
        } else {
        musica.pause();
        sessionStorage.setItem('musicaTocando', 'false');
        document.getElementById('botaoIniciarMusica').textContent = "Iniciar Música";
        }
    });

    //Verifica se a música estava tocando ao carregar a página
    verificarMusicaTocando();

    //Atualiza o texto do botão com base no estado atual
    document.getElementById('botaoIniciarMusica').textContent = musica.paused ? "Iniciar Música" : "Parar Música";
}

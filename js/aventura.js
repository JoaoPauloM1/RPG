import { telaHub } from "./telaHub.js";
import { exibirTela } from "../scripts.js";
import { adicionarAtributos } from "./atributos.js";
import { telaDerrota } from "./telaDerrota.js";

export function aventura(nomePersonagem, classeEscolhida, vida, estamina) {
    const tela = document.getElementById("tela");
    tela.innerHTML = '';

    //Div que contém tudo
    const screen = document.createElement("div");
    screen.classList.add("telaAventura");

    //Div dos atributos
    const atributosDiv = document.createElement("div");
    atributosDiv.classList.add("atributosDiv");
    screen.appendChild(atributosDiv);

    //Adiciona os atributos
    adicionarAtributos(atributosDiv, vida, estamina);

    //Container do personagem e nome
    const containerPersonagem = document.createElement("div");
    containerPersonagem.classList.add("containerPersonagemAventura");
    screen.appendChild(containerPersonagem);

    const nomedoPersonagem = document.createElement("span");
    nomedoPersonagem.textContent = nomePersonagem;
    nomedoPersonagem.classList.add("nomePersonagem");
    containerPersonagem.appendChild(nomedoPersonagem);

    const spritePersonagem = document.createElement("img");
    spritePersonagem.src = `./img/${classeEscolhida.toLowerCase()}.gif`;
    spritePersonagem.classList.add("spritePersonagem");
    containerPersonagem.appendChild(spritePersonagem);
    
    //Chance de encontrar inimigo
    const encontrouInimigo = Math.random() < 0.5;

    //Div para as opções na batalha
    const opcoesDiv = document.createElement("div");
    opcoesDiv.classList.add("opcoes");

    //Botão atacar
    const botaoAtacar = document.createElement("button");
    botaoAtacar.textContent = "Atacar";
    opcoesDiv.appendChild(botaoAtacar);

    //Botão fugir
    const botaoFugir = document.createElement("button");
    botaoFugir.textContent = "Fugir";
    opcoesDiv.appendChild(botaoFugir);
    
    //Div do inimigo
    const inimigoDiv = document.createElement("div");
    inimigoDiv.classList.add("inimigoDiv");

    //Vida do inimigo (10 a 25)
    let vidaInimigo = Math.floor(Math.random() * (25 - 10 + 1)) + 10;
    const vidaInimigoSpan = document.createElement("span");
    vidaInimigoSpan.classList.add("inimigoVida");
    vidaInimigoSpan.textContent = vidaInimigo;
    inimigoDiv.appendChild(vidaInimigoSpan);

    //Inimigo
    const inimigo = document.createElement("img");
    inimigo.src = "./img/inimigo.gif";
    inimigo.classList.add("spriteInimigo");
    inimigoDiv.appendChild(inimigo);

    //Div para mostrar se achou inimigo
    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("resultadoAventura");

    //Função para calcular dano crítico
    const calcularDanoCritico = (danoBase) => {
        const chanceCritico = Math.random() < 0.2;
        if (chanceCritico) {
            return danoBase * 2;
        }
        return danoBase;
    };

    // Função para atacar
    const atacar = () => {
    // Desabilita os botões de ataque e fugir até o final do turno do inimigo
    botaoAtacar.disabled = true;
    botaoFugir.disabled = true;

    // Jogador ataca o inimigo
    const danoJogador = calcularDanoCritico(5);
    resultadoDiv.textContent = `Você atacou! Dano: ${danoJogador}`;
    vidaInimigo -= danoJogador;

    // Atualiza a vida do inimigo
    vidaInimigoSpan.textContent = vidaInimigo;

    if (vidaInimigo <= 0) {
        vidaInimigo = 0;
        vidaInimigoSpan.textContent = vidaInimigo;
        resultadoDiv.textContent = "Você derrotou o inimigo!";
        inimigo.src = "./img/inimigo.png";
        setTimeout(() => {
            tela.innerHTML = '';
            telaHub(nomePersonagem, classeEscolhida, vida, estamina);
        }, 4000);
        return;
    }

    // Inimigo ataca o jogador após o ataque
    setTimeout(() => {
        const danoInimigo = calcularDanoCritico(5);
        resultadoDiv.textContent = `O inimigo atacou! Dano: ${danoInimigo}`;
        vida -= danoInimigo;

        if (vida <= 0) {
            atualizarAtributos();
            spritePersonagem.src = `./img/${classeEscolhida.toLowerCase()}.png`;
            resultadoDiv.textContent = "Você foi derrotado!";
            setTimeout(() => {
                tela.innerHTML = '';
                telaDerrota();
            }, 4000);
        } else {
            atualizarAtributos();

            // Habilita os botões após o turno do inimigo
            botaoAtacar.disabled = false;
            botaoFugir.disabled = false;
            }
        }, 1000);
    };


    //Função para atualizar os atributos na tela
    const atualizarAtributos = () => {
        atributosDiv.innerHTML = '';
        adicionarAtributos(atributosDiv, vida, estamina);
    };

    // Função para fugir
    const fugir = () => {
    // Desabilita os botões de ataque e fugir para evitar repetição de ações
    botaoAtacar.disabled = true;
    botaoFugir.disabled = true;

    const chanceFugir = Math.random() < 0.5;
    if (chanceFugir) {
        resultadoDiv.textContent = "Você fugiu!";
        setTimeout(() => {
            tela.innerHTML = '';
            telaHub(nomePersonagem, classeEscolhida, vida, estamina);
        }, 4000);
    } else {
        resultadoDiv.textContent = "Você não conseguiu fugir!";
        
        // Inimigo ataca o jogador depois de falhar na fuga
        setTimeout(() => {
            const danoInimigo = calcularDanoCritico(5);
            resultadoDiv.textContent = `O inimigo atacou! Dano: ${danoInimigo}`;
            vida -= danoInimigo;
            atualizarAtributos();

            if (vida <= 0) {
                spritePersonagem.src = `./img/${classeEscolhida.toLowerCase()}.png`;
                resultadoDiv.textContent = "Você foi derrotado!";
                setTimeout(() => {
                    tela.innerHTML = '';
                    telaDerrota();
                }, 4000);
            } else {
                // Reabilita os botões para o próximo turno
                botaoAtacar.disabled = false;
                botaoFugir.disabled = false;
            }
            }, 1000);
        }
    };

    //Batalha
    if (encontrouInimigo) {
        resultadoDiv.textContent = "Você encontrou um inimigo!";
        screen.appendChild(opcoesDiv);
        screen.appendChild(inimigoDiv);

        //Ações de atacar e fugir
        botaoAtacar.addEventListener("click", atacar);
        botaoFugir.addEventListener("click", fugir);

    } else {
        resultadoDiv.textContent = "Você não encontrou nada desta vez, retornando para casa...";
        setTimeout(() => {
            tela.innerHTML = '';
            telaHub(nomePersonagem, classeEscolhida, vida, estamina);
        }, 4000);
    }

    //Exibe a tela
    screen.appendChild(resultadoDiv);
    exibirTela(screen);
}

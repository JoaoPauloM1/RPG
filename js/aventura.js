import {
    telaHub
} from "./telaHub.js";
import {
    exibirTela
} from "../scripts.js";
import {
    adicionarAtributos
} from "./atributos.js";
import {
    telaDerrota
} from "./telaDerrota.js";
import {
    telaVitoria
} from "./telaVItoria.js";

export function aventura(nomePersonagem, classeEscolhida, vida, estamina, nivel, xp) {
    const tela = document.getElementById("tela");
    tela.innerHTML = '';
    xp += 5;

    //Div que contém tudo
    const screen = document.createElement("div");
    screen.classList.add("telaAventura");

    //Div dos atributos
    const atributosDiv = document.createElement("div");
    atributosDiv.classList.add("atributosDiv");
    screen.appendChild(atributosDiv);

    //Adiciona os atributos
    adicionarAtributos(atributosDiv, vida, estamina, nivel, xp);

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
    const encontrouInimigo = Math.random() < 0.7;

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

    //Ajusta a vida do inimigo com base no nível do jogador
    let vidaInimigo = Math.floor(Math.random() * 16) + 10 + (nivel - 1) * 5;
    const vidaInimigoSpan = document.createElement("span");
    vidaInimigoSpan.classList.add("inimigoVida");
    vidaInimigoSpan.textContent = vidaInimigo;
    inimigoDiv.appendChild(vidaInimigoSpan);

    // Escolhe o inimigo com base no nível
    let boss = 0;
    let inimigoSrc = "./img/inimigo.gif";
    let inimigoClass = "spriteInimigo"; // Classe padrão para inimigo

    if (nivel >= 7) {
        inimigoSrc = "./img/boss.gif";
        inimigoClass = "spriteBoss"; // Define a classe como spriteBoss para o boss
        boss = 1;
    } else if (nivel >= 5) {
    inimigoSrc = "./img/inimigo_forte.gif";
    } else if (nivel >= 3) {
    inimigoSrc = "./img/inimigo_medio.gif";
    }

    const inimigo = document.createElement("img");
    inimigo.src = inimigoSrc;
    inimigo.classList.add(inimigoClass); // Aplica a classe apropriada
    inimigoDiv.appendChild(inimigo);

    //Div para mostrar se achou inimigo
    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("resultadoAventura");

    //Função para calcular dano crítico
    const calcularDanoCritico = (danoBase) => {
        const chanceCritico = Math.random() < 0.2;
        if (chanceCritico) {
            let crit = Math.random();
            while (crit > 0.7 || crit < 0.5) {
                crit = Math.random();
            }
            return (danoBase / crit).toFixed(1);
        }
        return danoBase;
    };

    // Função para gerar um fator aleatório de variação entre -10% e +10%
    function gerarFatorAleatorio() {
        return 1 + (Math.random() * 0.2 - 0.1); // Faixa de -10% a +10%
    }

    //Função para atacar
    const atacar = () => {
        //Desabilita os botões de ataque e fugir até o final do turno do inimigo
        botaoAtacar.disabled = true;
        botaoFugir.disabled = true;

        //Jogador ataca o inimigo
        const danoJogador = calcularDanoCritico(5 + nivel) * gerarFatorAleatorio();
        resultadoDiv.textContent = `Você atacou! Dano: ${danoJogador.toFixed(1)}`;
        const somMob = new Audio('/sons/som-mob.mp3');
        somMob.volume = 0.15;
        somMob.play();
        vidaInimigo -= danoJogador;

        //Atualiza a vida do inimigo
        vidaInimigoSpan.textContent = vidaInimigo.toFixed(1);

        if (vidaInimigo <= 0) {
            vidaInimigo = 0;
            vidaInimigoSpan.textContent = vidaInimigo;
            resultadoDiv.textContent = "Você derrotou o inimigo!";
            const somDerrotou = new Audio('/sons/som-derrotou.mp3');
            somDerrotou.volume = 0.15;
            somDerrotou.play();
            if (boss == 1) {
                inimigo.src = "./img/inimigo_derrotado.png";
                alert("Parabéns! Você derrotou o boss do jogo!");
                const somDerrotou = new Audio('/sons/som-derrotou.mp3');
                somDerrotou.volume = 0.15;
                somDerrotou.play();
                setTimeout(() => {
                    tela.innerHTML = '';
                    telaVitoria();
                }, 2000);
            } else {
                inimigo.src = "./img/inimigo_derrotado.png";
                xp += 10;
                setTimeout(() => {
                    tela.innerHTML = '';
                    telaHub(nomePersonagem, classeEscolhida, vida, estamina, nivel, xp);
                }, 3000);
            }
            return;
        }

        //Inimigo ataca o jogador após o ataque
        setTimeout(() => {
            const danoInimigo = calcularDanoCritico(4.7 + Math.floor(nivel / 2)) * gerarFatorAleatorio();
            resultadoDiv.textContent = `O inimigo atacou! Dano: ${danoInimigo.toFixed(1)}`;
            const somDano = new Audio('/sons/som-dano.mp3');
            somDano.volume = 0.15;
            somDano.play();
            vida -= danoInimigo;

            if (vida <= 0) {
                vida = 0;
                atualizarAtributos();
                spritePersonagem.src = `./img/${classeEscolhida.toLowerCase()}.png`;
                resultadoDiv.textContent = "Você foi derrotado!";
                setTimeout(() => {
                    tela.innerHTML = '';
                    telaDerrota();
                }, 3000);
            } else {
                atualizarAtributos();

                //Habilita os botões após o turno do inimigo
                botaoAtacar.disabled = false;
                botaoFugir.disabled = false;
            }
        }, 1000);
    };

    //Função para atualizar os atributos na tela
    const atualizarAtributos = () => {
        atributosDiv.innerHTML = '';
        adicionarAtributos(atributosDiv, vida, estamina, nivel, xp);
    };

    //Função para fugir
    const fugir = () => {
        //Desabilita os botões de ataque e fugir para evitar repetição de ações
        botaoAtacar.disabled = true;
        botaoFugir.disabled = true;

        const chanceFugir = Math.random() < 0.5;
        if (chanceFugir) {
            resultadoDiv.textContent = "Você fugiu!";
            setTimeout(() => {
                tela.innerHTML = '';
                telaHub(nomePersonagem, classeEscolhida, vida, estamina, nivel, xp);
            }, 3000);
        } else {
            resultadoDiv.textContent = "Você não conseguiu fugir!";

            //Inimigo ataca o jogador depois de falhar na fuga
            setTimeout(() => {
                const danoInimigo = calcularDanoCritico(5 + Math.floor(nivel / 2));
                resultadoDiv.textContent = `O inimigo atacou! Dano: ${danoInimigo}`;
                vida -= danoInimigo;
                atualizarAtributos();

                if (vida <= 0) {
                    spritePersonagem.src = `./img/${classeEscolhida.toLowerCase()}.png`;
                    vida = 0;
                    atualizarAtributos();
                    resultadoDiv.textContent = "Você foi derrotado!";
                    setTimeout(() => {
                        tela.innerHTML = '';
                        telaDerrota();
                    }, 3000);
                } else {
                    //Reabilita os botões para o próximo turno
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
            telaHub(nomePersonagem, classeEscolhida, vida, estamina, nivel, xp);
        }, 3000);
    }

    //Exibe a tela
    screen.appendChild(resultadoDiv);
    exibirTela(screen);
}
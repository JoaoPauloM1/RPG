// Note: Variable and functions names are in Portuguese as the project was initially developed this way.

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

    const screen = document.createElement("div");
    screen.classList.add("telaAventura");

    const atributosDiv = document.createElement("div");
    atributosDiv.classList.add("atributosDiv");
    screen.appendChild(atributosDiv);

    adicionarAtributos(atributosDiv, vida, estamina, nivel, xp);

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

    const encontrouInimigo = Math.random() < 0.7;

    const opcoesDiv = document.createElement("div");
    opcoesDiv.classList.add("opcoes");

    const botaoAtacar = document.createElement("button");
    botaoAtacar.textContent = "Attack";
    opcoesDiv.appendChild(botaoAtacar);

    const botaoFugir = document.createElement("button");
    botaoFugir.textContent = "Run";
    opcoesDiv.appendChild(botaoFugir);

    const inimigoDiv = document.createElement("div");
    inimigoDiv.classList.add("inimigoDiv");

    let vidaInimigo = Math.floor(Math.random() * 16) + 10 + (nivel - 1) * 5;
    const vidaInimigoSpan = document.createElement("span");
    vidaInimigoSpan.classList.add("inimigoVida");
    vidaInimigoSpan.textContent = vidaInimigo;
    inimigoDiv.appendChild(vidaInimigoSpan);

    let boss = 0;
    let inimigoSrc = "./img/inimigo.gif";
    let inimigoClass = "spriteInimigo";

    if (nivel >= 7) {
        inimigoSrc = "./img/boss.gif";
        inimigoClass = "spriteBoss";
        boss = 1;
    } else if (nivel >= 5) {
    inimigoSrc = "./img/inimigo_forte.gif";
    } else if (nivel >= 3) {
    inimigoSrc = "./img/inimigo_medio.gif";
    }

    const inimigo = document.createElement("img");
    inimigo.src = inimigoSrc;
    inimigo.classList.add(inimigoClass);
    inimigoDiv.appendChild(inimigo);

    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("resultadoAventura");

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

    function gerarFatorAleatorio() {
        return 1 + (Math.random() * 0.2 - 0.1);
    }

    const atacar = () => {
        botaoAtacar.disabled = true;
        botaoFugir.disabled = true;

        const danoJogador = calcularDanoCritico(5 + nivel) * gerarFatorAleatorio();
        resultadoDiv.textContent = `You attacked! Damage dealt: ${danoJogador.toFixed(1)}`;
        const somMob = new Audio('/sons/som-mob.mp3');
        somMob.volume = 0.15;
        somMob.play();
        vidaInimigo -= danoJogador;

        vidaInimigoSpan.textContent = vidaInimigo.toFixed(1);

        if (vidaInimigo <= 0) {
            vidaInimigo = 0;
            vidaInimigoSpan.textContent = vidaInimigo;
            resultadoDiv.textContent = "You defeated the enemy!";
            const somDerrotou = new Audio('/sons/som-derrotou.mp3');
            somDerrotou.volume = 0.15;
            somDerrotou.play();
            if (boss == 1) {
                inimigo.src = "./img/inimigo_derrotado.png";
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

        setTimeout(() => {
            const danoInimigo = calcularDanoCritico(4.7 + Math.floor(nivel / 2)) * gerarFatorAleatorio();
            resultadoDiv.textContent = `The enemy attacked! Damage dealt: ${danoInimigo.toFixed(1)}`;
            const somDano = new Audio('/sons/som-dano.mp3');
            somDano.volume = 0.15;
            somDano.play();
            vida -= danoInimigo;

            if (vida <= 0) {
                vida = 0;
                atualizarAtributos();
                spritePersonagem.src = `./img/${classeEscolhida.toLowerCase()}.png`;
                resultadoDiv.textContent = "You have been defeated!";
                setTimeout(() => {
                    tela.innerHTML = '';
                    telaDerrota();
                }, 3000);
            } else {
                atualizarAtributos();

                botaoAtacar.disabled = false;
                botaoFugir.disabled = false;
            }
        }, 1000);
    };

    const atualizarAtributos = () => {
        atributosDiv.innerHTML = '';
        adicionarAtributos(atributosDiv, vida, estamina, nivel, xp);
    };

    const fugir = () => {
        botaoAtacar.disabled = true;
        botaoFugir.disabled = true;

        const chanceFugir = Math.random() < 0.5;
        if (chanceFugir) {
            resultadoDiv.textContent = "You have fled!";
            const somFugiu = new Audio('/sons/som-fugiu.mp3');
            somFugiu.volume = 0.15;
            somFugiu.play();
            setTimeout(() => {
                tela.innerHTML = '';
                telaHub(nomePersonagem, classeEscolhida, vida, estamina, nivel, xp);
            }, 3000);
        } else {
            resultadoDiv.textContent = "You couldn't escape!";

            setTimeout(() => {
                const danoInimigo = calcularDanoCritico(5 + Math.floor(nivel / 2));
                resultadoDiv.textContent = `The enemy attacked! Damage dealt: ${danoInimigo}`;
                vida -= danoInimigo;
                atualizarAtributos();

                if (vida <= 0) {
                    spritePersonagem.src = `./img/${classeEscolhida.toLowerCase()}.png`;
                    vida = 0;
                    atualizarAtributos();
                    resultadoDiv.textContent = "You have been defeated!";
                    setTimeout(() => {
                        tela.innerHTML = '';
                        telaDerrota();
                    }, 3000);
                } else {
                    botaoAtacar.disabled = false;
                    botaoFugir.disabled = false;
                }
            }, 1000);
        }
    };

    if (encontrouInimigo) {
        resultadoDiv.textContent = "An enemy appears!";
        screen.appendChild(opcoesDiv);
        screen.appendChild(inimigoDiv);

        botaoAtacar.addEventListener("click", atacar);
        botaoFugir.addEventListener("click", fugir);

    } else {
        resultadoDiv.textContent = "Nothing was found this time, heading back home...";
        const somDescanso = new Audio('/sons/som-descanso.mp3');
        somDescanso.volume = 0.15;
        somDescanso.play();
        setTimeout(() => {
            somDescanso.pause();
            tela.innerHTML = '';
            telaHub(nomePersonagem, classeEscolhida, vida, estamina, nivel, xp);
        }, 3000);
    }

    screen.appendChild(resultadoDiv);
    exibirTela(screen);
}
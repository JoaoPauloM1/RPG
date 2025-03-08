import { exibirTela } from "../scripts.js";

export function telaVitoria() {
    const tela = document.getElementById("tela");
    tela.innerHTML = ''; 

    const vitoriaDiv = document.createElement("div");
    vitoriaDiv.classList.add("telaVitoria");

    const somVitoria = new Audio('/sons/som-vitoria.mp3');
            somVitoria.volume = 0.1;
            somVitoria.play();

    const mensagem = document.createElement("span");
    mensagem.textContent = "Você venceu! Parabéns!";
    mensagem.classList.add("mensagemVitoria");

    vitoriaDiv.appendChild(mensagem);
    tela.appendChild(vitoriaDiv);

    alert("Parabéns! Você derrotou o boss do jogo!");

    setTimeout(() => {
        location.reload()
    }, 5000);

    exibirTela(vitoriaDiv);
}
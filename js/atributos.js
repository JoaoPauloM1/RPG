export function adicionarAtributos(atributosDiv, vida, estamina, nivel, xp) {
    function adicionarAtributo(nome, valor, imagemSrc) {
        const atributoContainer = document.createElement("div");
        atributoContainer.classList.add("atributosSprites");

        const imagem = document.createElement("img");
        imagem.src = imagemSrc;
        imagem.alt = nome;

        const valorSpan = document.createElement("span");
        valorSpan.classList.add("atributosValor");
        valorSpan.textContent = valor;

        atributoContainer.appendChild(imagem);
        atributoContainer.appendChild(valorSpan);
        atributosDiv.appendChild(atributoContainer);
    }

    adicionarAtributo("HP", vida.toFixed(1), "./img/coracao.png");
    adicionarAtributo("Stamina", estamina, "./img/estamina.png");

    const nivelLabel = document.createElement("span");
    nivelLabel.textContent = `Level: ${nivel}`;
    atributosDiv.appendChild(nivelLabel);

    const xpDiv = document.createElement("div");
    const xpLabel = document.createElement("span");
    xpLabel.textContent = `XP: ${xp}`;
    xpDiv.appendChild(xpLabel);
    atributosDiv.appendChild(xpDiv);
}
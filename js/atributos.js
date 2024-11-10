export function adicionarAtributos(atributosDiv, vida, estamina, nivel, xp) {
    // Função para criar e adicionar os atributos na tela
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

    // Chama a função para cada atributo com as imagens correspondentes
    adicionarAtributo("Vida", vida.toFixed(1), "./img/coracao.png");
    adicionarAtributo("Estamina", estamina, "./img/estamina.png");

    // Adiciona o nível
    const nivelLabel = document.createElement("span");
    nivelLabel.textContent = `Nível: ${nivel}`;
    atributosDiv.appendChild(nivelLabel);

    // Adiciona a experiência
    const xpDiv = document.createElement("div");
    const xpLabel = document.createElement("span");
    xpLabel.textContent = `XP: ${xp}`;
    xpDiv.appendChild(xpLabel);
    atributosDiv.appendChild(xpDiv);
}
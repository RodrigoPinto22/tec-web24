function getInfo() {
    var button = event.target;
    var btnValue = button.value;
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    
    const overlayContent = document.createElement("div");
    overlayContent.className = "overlayContent"
    const title = document.createElement("h1")

    const titles = {
        2: "Descriçao",
        3: "Regras",
    };
    title.textContent = titles[btnValue]
    title.className = "title"
    overlayContent.appendChild(title)
    if (btnValue == 2) {
        const list = document.createElement("ol")
        const items2 = [
            " Jogo de tabuleiro para 2 jogadores",
            " O Tabuleiro é constituído por n quadrados concêntricos, onde cada um deles é constituído por 8 casas (4 nas pontas e 4 no centro das arestas).",
            " As 4 casas presentes no centro das arestas de cada quadrado são ligadas entre si.",
            " Num Tabuleiro com n quadrados, cada jogador terá 3n peças para jogar (Ou seja, se o jogo for constituído por 3 quadrados, cada jogador terá 3x3=9 peças).",
            " O objetivo principal é fazer o Moínho (sequência de 3 peças da mesma cor, presentes ao longo de uma única linha horizontal ou vertical) para retirar peças ao adversário.",
        ]
        items2.forEach((itemText) => {
            const listItem = document.createElement("li");
            listItem.className = "listItem"
            listItem.textContent = itemText;
            list.appendChild(listItem);
        });
        overlayContent.appendChild(list);

        const msg = document.createElement("h1")

        
    } else if (btnValue == 3) {

        const list = document.createElement("ol")
        const items3 = [
            "O jogo tem duas fases:",
            "<> Fase 1 - colocar as peças alternadamente",
            "<> Fase 2 - mover as peças, onde cada peça só pode ser movida para um casa contígua",
            "Quando um jogador ficar com 3 peças, pode iniciar o movimento livre (consiste na colocação das peças em qualquer casa livre",
            "O jogo termina quando:",
            "<> Um jogador tiver 2 peças",
            "<> Empate:",
            "- não for possível realizar uma jogada válida",
            "- ambos tiverem 3 peças e não conseguirem criar um moínho após 10 jogadas"
        ]
        items3.forEach((itemText) => {
            const listItem = document.createElement("li");
            listItem.className = "listItem"
            listItem.textContent = itemText;
            list.appendChild(listItem);
        });
        overlayContent.appendChild(list);
    }

    overlay.appendChild(overlayContent)

    const closeButton = document.createElement("button")
    closeButton.className = "closeButton"
    closeButton.innerText = "X";
    closeButton.onclick = closeOverlay;
    overlayContent.appendChild(closeButton)

    document.body.appendChild(overlay);

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            overlay.remove();
        }
    });
}



function closeOverlay(){
    const overlay = document.querySelector(".overlay");
    overlay.remove();
}
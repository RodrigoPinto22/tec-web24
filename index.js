function getInfo(event) {
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



function mudarCor() {
    const selecionado = document.getElementById("primeiro").value;
    const select = document.getElementById("primeiro");
    select.classList.remove("vermelho", "azul");
    if (selecionado === "0") {
        select.classList.add("vermelho");
    } else if (selecionado === "1") {
        select.classList.add("azul");
    }
}
document.getElementById("primeiro").addEventListener("change", mudarCor);



const items = ["33", "22", "44", "11"];


function classificacao(event, items) {
    var button = event.target;
    var btnValue = button.value;
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    
    const overlayContent = document.createElement("div");
    overlayContent.className = "overlayContent";
    const title = document.createElement("h1");

    const titles = {
        4: "Classificação",
    };
    title.textContent = titles[btnValue] || "Classificação";
    title.className = "title";
    overlayContent.appendChild(title);

    const sortedItems = items.slice().sort((a, b) => {
        return parseFloat(a) - parseFloat(b);
    });

    const list = document.createElement("ol");
    sortedItems.forEach((itemText) => {
        const listItem = document.createElement("li");
        listItem.className = "listItem";
        listItem.textContent = itemText;
        list.appendChild(listItem);
    });
    overlayContent.appendChild(list);

    const closeButton = document.createElement("button");
    closeButton.className = "closeButton";
    closeButton.innerText = "X";
    closeButton.onclick = closeOverlay;
    overlayContent.appendChild(closeButton);

    overlay.appendChild(overlayContent);

    document.body.appendChild(overlay);

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            overlay.remove();
        }
    });
}

let counter=0;
let corcomeca=0;
function corinicial(){
    var selectElement = document.getElementById("primeiro").value;
    if (selectElement==1){counter=1;corcomeca=1;}
    else {counter=0;corcomeca=0;}
}
let red_cells = [];
let blue_cells = [];

const three_seq = [
    ["outside-cell-1", "outside-cell-2", "outside-cell-3"],
    ["outside-cell-1", "outside-cell-4", "outside-cell-7"],
    ["outside-cell-3", "outside-cell-6", "outside-cell-9"],
    ["outside-cell-7", "outside-cell-8", "outside-cell-9"],
    ["middle-cell-1", "middle-cell-2", "middle-cell-3"],
    ["middle-cell-1", "middle-cell-4", "middle-cell-7"],
    ["middle-cell-3", "middle-cell-6", "middle-cell-9"],
    ["middle-cell-7", "middle-cell-8", "middle-cell-9"],
    ["center-cell-1", "center-cell-2", "center-cell-3"],
    ["center-cell-1", "center-cell-4", "center-cell-7"],
    ["center-cell-3", "center-cell-6", "center-cell-9"],
    ["center-cell-7", "center-cell-8", "center-cell-9"]
]

let board = [
    [null, null, null, null, null, null, null, null], // Outside square
    [null, null, null, null, null, null, null, null], // Middle square
    [null, null, null, null, null, null, null, null]  // Center square
];

LINK = "http://twserver.alunos.dcc.fc.up.pt:8008/"
let nick = '';
let password = '';
let group = 21;
let size = 3;
let game = 0;
let playersList = {}

function register(event) {

    event.preventDefault();
    nick = document.getElementById("Username").value;
    password = document.getElementById("Password").value;
    playersList[nick] = password;

    fetch(LINK + "register",{
        method: 'POST',
        body: JSON.stringify( { nick, password } )  
      })
        .then((response) => {
            if(response.status === 200){
                loggedIn = true
            }
          return response.json()
        })
        .then((json) => console.log(json))
        .catch((error) => console.error('Error during fetch:', error));
}

async function join() {
    console.log(`Joining game with nick: ${nick}, group: ${group}, size: ${size}`);

    try {
        // Add a loading indicator or disable the join button here
        const response = await fetch(LINK + "join", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                nick, 
                password, 
                group, 
                size,
                // Add game preference to match with waiting players
                join: true 
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to join: ${response.status} - ${errorText}`);
            throw new Error(`Failed to join: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('Successfully joined:', data);
        game = data.game; // Store the game ID globally

        // Use update() instead of checkGameStatus() for Server-Sent Events
        update(data.game);
    } catch (error) {
        console.error('Error during join:', error.message);
        // Add error handling UI feedback here
    }
}

async function checkGameStatus(gameId) {
    console.log('Checking game updates for Game ID:', gameId);

    const pollInterval = 2000; // Poll every 2 seconds

    return new Promise((resolve, reject) => {
        console.log('Starting game status check interval...');
        const interval = setInterval(async () => {
            try {
                const response = await fetch(`${LINK}update?nick=${nick}&game=${gameId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    console.error(`Failed to get updates: ${response.status}`);
                    throw new Error(`Failed to get updates: ${response.status}`);
                }

                const statusData = await response.json();
                console.log('Current game update:', statusData);

                if (statusData.turn || statusData.phase) {
                    clearInterval(interval);
                    console.log('Game is starting!');
                    startGame(statusData); // Start the game
                    resolve();
                } else {
                    console.log('Waiting for the second player to join...');
                }
            } catch (error) {
                clearInterval(interval);
                console.error('Error while checking game updates:', error.message);
                reject(error);
            }
        }, pollInterval);
    });
}

function update(gameId) {
    console.log(`Listening for updates on game: ${gameId}`);

    // Create an EventSource for the update endpoint
    const eventSource = new EventSource(`${LINK}update?nick=${nick}&game=${gameId}`);

    // Handle messages from the server
    eventSource.onmessage = function (event) {
        const data = JSON.parse(event.data);
        console.log('Received update:', data);

        // Check for game start conditions
        if (data.turn || data.phase) {
            console.log('Game has started!');
            startGame(data); // Call your game start logic here

            // Close the connection since game has started
            eventSource.close();
        } else {
            console.log('Waiting for game to start...', data);
        }
    };

    // Handle errors
    eventSource.onerror = function (error) {
        console.error('Error with EventSource:', error);
        eventSource.close();
    };
}


function startGame(gameData) {
    console.log('Starting the game with data:', gameData);
    // Your logic to initialize or launch the game, e.g.:
    // renderGameBoard(gameData);
    // setPlayerInfo(gameData.players);
    start_game()
}


function logout() {
  
    fetch(LINK + "leave", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nick, password, game })
    })
    .then((response) => {
        if (response.ok) {
            console.log(`Logout successful. Code: ${response.status} - ${response.statusText}`);
            loggedIn = false;
            return; 
        } else {
            return response.text().then((text) => {
                console.error("Logout failed. Server response:", text);
                throw new Error(`Logout failed: ${response.status} - ${text}`);
            });
        }
    })
    .catch((error) => {
        console.error("Error during logout:", error.message);
        console.error("Error details:", error);
        if (error instanceof TypeError && error.message.includes('NetworkError')) {
            console.error("NetworkError: Check CORS policy or network connectivity.");
        }
    });
}

function start_game() {
    const corners = document.getElementsByClassName("corner");
    const sides = document.getElementsByClassName("side");
    for (let i = 0; i < corners.length; i++) {
        const corner = corners[i];
        corner.addEventListener("click", placePieces);
    }
    for (let i = 0; i < sides.length; i++) {
        const side = sides[i];
        side.addEventListener("click", placePieces);
    }
}

function placePieces(event) {
    const clickedElement = event.currentTarget.querySelector(".cell");

    if (clickedElement && clickedElement.querySelector(".piece")) {
        return; 
    }

    var color = (counter % 2 === 0) ? "red" : "blue";

    const piece = document.createElement("div");
    piece.className = "piece";
    piece.style.backgroundColor = color;
    piece.classList.add(color);
    clickedElement.appendChild(piece);

    let str = clickedElement.parentElement.id; 
    let num = str.split("-"); 

    let cellNum = parseInt(num[2], 10); 
    let square = num[0];

    let y; 
    if (square === "outside") {
        y = 0; 
    } else if (square === "middle") {
        y = 1; 
    } else if (square === "center") {
        y = 2; 
    } else {
        console.error("Invalid square type:", square);
        return;
    }
    
    if (cellNum >= 0 && cellNum < board[0].length && y >= 0 && y < board.length) {
        board[y][cellNum] = color; 
        console.log(`Updated board at [${y}][${cellNum}] to ${color}`);
    } else {
        console.error(`Invalid indices for board update: x=${cellNum}, y=${y}`);
    }
    counter++;

    if (counter === 10) {
        const corners = document.getElementsByClassName("corner");
        const sides = document.getElementsByClassName("side");
        for (let i = 0; i < corners.length; i++) {
            const corner = corners[i];
            corner.removeEventListener("click", placePieces);
        }
        for (let i = 0; i < sides.length; i++) {
            const side = sides[i];
            side.removeEventListener("click", placePieces);
        }
        captureStage();
    }
}

function captureStage() {
    console.log("Capture Stage Initialized");

    let selectedPiece = null;
    const corners = document.getElementsByClassName("corner");
    const sides = document.getElementsByClassName("side");

    for (let i = 0; i < corners.length; i++) {
        corners[i].addEventListener("click", playerMove);
    }
    for (let i = 0; i < sides.length; i++) {
        sides[i].addEventListener("click", playerMove);
    }

    function playerMove(event) {
        const cell = event.currentTarget;
        const piece = cell.querySelector(".piece");

        if (piece) {
            const pieceColor = piece.classList.contains("red") ? "red" : "blue";

            console.log("Color of clicked cell:", pieceColor);

            if ((counter % 2 === 0 && pieceColor === "red") || (counter % 2 !== 0 && pieceColor === "blue")) {
                console.log("Valid piece selected for current player");

                if (!selectedPiece) {
                    selectedPiece = piece;
                    cell.classList.add("selected");
                } else if (selectedPiece === piece) {
                    selectedPiece = null;
                    cell.classList.remove("selected");
                }
            }
            else{
                if (checkSeq(pieceColor))  {
                    let id = piece.parentElement.parentElement.id
                    if (pieceColor === "red") {
                        let idx = red_cells[id]
                        red_cells.splice(idx, 1)

                    }
                    else  {
                        let idx = blue_cells[id]
                        blue_cells.splice(idx, 1)

                    }
                    piece.remove()
                    counter++;
                }
            }
        } else if (selectedPiece) {
            const pieceColor = selectedPiece.classList.contains("red") ? "red" : "blue";

            const remId = selectedPiece.parentElement.parentElement.id

            movePiece(cell, pieceColor, remId);
        }
    }

    function movePiece(targetCell, color, remId) {
        if (!targetCell.querySelector(".piece") && selectedPiece) {

            targetCell.querySelector(".cell").appendChild(selectedPiece);
            targetCell.classList.remove("selected");
            selectedPiece = null;
            let targetId = targetCell.id
            if (color === "red") {
                let idx = red_cells[remId]
                red_cells.splice(idx, 1)
                red_cells.push(targetId)
            }
            if (color === "blue") {
                let idx = blue_cells[remId]
                blue_cells.splice(idx, 1)
                blue_cells.push(targetId)
            }

            counter++;
        } else {
            console.log("Invalid move");
        }
    }

    function checkSeq(color) {
        let arr = [];
        arr = color === "red" ? blue_cells : red_cells;
        function hasMatchingSequence(cells, sequences) {
            return sequences.some(sequence =>
                sequence.every(cell => cells.includes(cell))
            );
        }
        return hasMatchingSequence(arr,three_seq)
    }
}
function resetGame() {
    counter=corcomeca;
    red_cells = [];
    blue_cells = [];

    const pieces = document.querySelectorAll(".piece");
    pieces.forEach(piece => piece.remove());

    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.classList.remove("selected");
        cell.classList.remove("occupied");
    });
}

document.getElementById("resetButton").addEventListener("click", resetGame);

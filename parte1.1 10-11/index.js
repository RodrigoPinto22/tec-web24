let counter = 0;

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

    var color = (counter % 2 == 0) ? "red" : "blue";

    const piece = document.createElement("div");
    piece.className = "piece";
    piece.style.backgroundColor = color;
    piece.classList.add(color)
    clickedElement.appendChild(piece);
    counter++;  

    if (counter === 6) {
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
        captureStage()
    }
}

function captureStage() {
    console.log("Capture Stage Initialized");
    let selectedPiece = null; // Tracks selected piece for move
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
        console.log(counter)

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
                console.log(`id = ${piece.parentElement.parentElement.id}`) //doent work
                //piece.remove()
            }
        } else if (selectedPiece) {
            movePiece(cell);
        }
    }

    function movePiece(targetCell) {
        if (!targetCell.querySelector(".piece") && selectedPiece) {
    
            targetCell.querySelector(".cell").appendChild(selectedPiece);
    
            targetCell.classList.remove("selected");
            selectedPiece = null; 
            console.log("asd")
            counter++; 
        } else {
            console.log("Invalid move");
        }
    }
    
    

    function capturePiece() {
        
    }
}



let counter = 0;

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

    if (counter === 4) {
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

    // Add event listeners to all corner and side cells
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
        // Check if the cell contains a piece
        if (piece) {
            const pieceColor = piece.classList.contains("red") ? "red" : "blue";
            console.log("Color of clicked cell:", pieceColor);

            if ((counter % 2 === 0 && pieceColor === "red") || (counter % 2 !== 0 && pieceColor === "blue")) {
                console.log("Valid piece selected for current player");

                // Check if moving a piece or selecting a new one to place
                if (!selectedPiece) {
                    selectedPiece = piece; // Mark this piece as selected for moving
                    cell.classList.add("selected"); // Add visual feedback
                } else if (selectedPiece === piece) {
                    selectedPiece = null; // Deselect if clicking the same piece
                    cell.classList.remove("selected");
                }
            }
        } else if (selectedPiece) {
            movePiece(cell); // Move to the clicked empty cell
        }
    }

    function movePiece(targetCell) {
        if (!targetCell.querySelector(".piece") && selectedPiece) {
            // Get the original cell containing the selected piece
            const originalCell = selectedPiece.parentElement;
    
            // Move the selected piece to the target cell without altering the cell's original background
            targetCell.querySelector(".cell").appendChild(selectedPiece);
    
            // Remove the piece from the original cell but keep the background
    
            // Clear selected state and reset variables
            targetCell.classList.remove("selected");
            selectedPiece = null; // Clear selected piece after move
            console.log("asd")
            counter++; // Update turn counter
        } else {
            console.log("Invalid move");
        }
    }
    
    

    function capturePiece() {
        // Implement piece capture logic based on game rules here
    }
}


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
    console.log(counter)
    const corners = document.getElementsByClassName("corner");
    const sides = document.getElementsByClassName("side");
    for (let i = 0; i < corners.length; i++) {
        const corner = corners[i];
        corner.addEventListener("click", playerMove);
    }
    for (let i = 0; i < sides.length; i++) {
        const side = sides[i];
        side.addEventListener("click", playerMove);
    }

    function playerMove(event) {
        const clickedPiece = event.currentTarget.querySelector(".piece");
        const clickedPieceColor = clickedPiece.classList[1];
        console.log("ID of clicked cell:", clickedPieceColor);

        if (clickedPieceColor === "red") {
            if (counter % 2 != 0) {
                
            }
            console.log("AS")
            if (clickedElement && clickedElement.querySelector(".piece")) {
                return; 
            }
        }
    }
    function movePiece() {

    }

    function capturePiece() {

    }
}

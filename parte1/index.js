function start_game() {
    const corners = document.getElementsByClassName("corner")
    const sides = document.getElementsByClassName("side")
    for (let i = 0; i < corners.length; i++) {
        const element = document.getElementById(corners[i].id)
        element.addEventListener("click", add_piece)
    }
}

function add_piece(clicked_id, clicked_class) {
    const node = document.getElementById(clicked_id)
    const rem_node = document.getElementById(clicked_id).childNodes
    node.removeChild(rem_node[1])


    const piece = document.createElement("div")
    piece.className = "piece"
    node.appendChild(piece)
}



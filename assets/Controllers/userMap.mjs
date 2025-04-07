import { Board, saveBoard } from '../../funciones/board.mjs';
import { Piece } from './../../funciones/piece.mjs';
import Vector2 from './../../funciones/vector2.mjs';

const mapSize = 10;
let userMap = null;
let isVertical = false;
const defaultSizes = [2, 2, 3, 3, 4, 5];
let sizes = []

function isOutOfBounds(x, y, size) {
    return isVertical
        ? y + size > mapSize
        : x + size > mapSize;
}

function renderMap()
{
    userMap.renderOn("userMap", mapSize, placePiece);
}

function placePiece(x,y)
{
    let size = sizes.pop()
    if (!size)
    {
        alert("Ya no hay más barcos por colocar.");
        return
    }

    let piece = new Piece(new Vector2(x, y), isVertical, size)

    if (isOutOfBounds(x,y,size))
    {
        alert("El barco no se puede poner en esa posición, está fuera de la esquina.");
        return
    }
    else if (!userMap.canPlacePiece(piece))
    {
        alert("No se puede colocar el barco en esta posición.");
    }

    userMap.pieces.push(piece);
    
    renderMap();
}

function resetMap()
{
    sizes = defaultSizes.map(x => x);
    userMap.reset();
    renderMap();
}

function handleSubmit()
{
    if (sizes.length == 0) {
        saveBoard(userMap);
        // Redireccionar al usuario a views/game.html
        window.location.href = "../views/game.html";
    } else {
        alert("Por favor, coloca todos los barcos antes de iniciar el juego.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const buttonDirection = document.getElementById("buttonDirection");
    const buttonReboot = document.getElementById("buttonReboot");
    const buttonStartGame = document.getElementById("buttonStartGame");

    userMap = new Board();

    resetMap();
    renderMap();

    buttonDirection.addEventListener("click", () => {
        isVertical = !isVertical;
        buttonDirection.textContent = isVertical
            ? "Dirección: Vertical"
            : "Dirección: Horizontal";

        buttonDirection.classList.toggle("horizontal", !isVertical);
        buttonDirection.classList.toggle("vertical", isVertical);
    });

    buttonReboot.addEventListener("click", resetMap);

    buttonStartGame.addEventListener("click", handleSubmit);
})
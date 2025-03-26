import { Board } from './board.mjs';
import { Piece, PieceType } from './piece.mjs';
import Vector2 from './vector2.mjs';
import { Bomb, launchBomb } from './bomb.mjs';


document.addEventListener("DOMContentLoaded", () => {
    console.log("Hellou"); 

    const board = new Board(); 

    function createMap(board, size = 10) {
        const mapElement = document.getElementById("map"); 

        mapElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        mapElement.style.gridTemplateRows = `repeat(${size}, 1fr)`;


        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.x = x;
                cell.dataset.y = y;
                cell.textContent = "a"; 
                mapElement.appendChild(cell);
            }
        }

        board.pieces.forEach(piece => {
            let x1 = piece.position.x;
            let x2 = piece.isVertical ? x1 : x1 + piece.size - 1;
            let y1 = piece.position.y;
            let y2 = piece.isVertical ? y1 + piece.size - 1 : y1;

            for (let x = x1; x <= x2; x++) {
                for (let y = y1; y <= y2; y++) {
                    const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
                    if (cell) {
                        cell.textContent = "p1";
                        cell.classList.add("p1");
                    }
                }
            }
        });

        board.launchedBombs.forEach(bomb => {
            const cell = document.querySelector(`.cell[data-x="${bomb.position.x}"][data-y="${bomb.position.y}"]`);
            if (cell) {
                if (cell.textContent === "a") {
                    cell.textContent = "b"; 
                    cell.classList.add("b");
                } else if (cell.textContent.includes("p1")) {
                    cell.textContent += "-h"; 
                    cell.classList.add("hit");
                } else if (cell.textContent.includes("p2")) {
                    cell.textContent += "-h";
                    cell.classList.add("hit");
                }
            }
        });
    }

    board.pieces.push(new Piece(new Vector2(2, 3), false, 4, PieceType.SHIP)); 
    board.pieces.push(new Piece(new Vector2(5, 5), true, 3, PieceType.SUBMARINE)); 

    launchBomb(board, new Vector2(6, 5)); 
    launchBomb(board, new Vector2(8, 8)); 


    createMap(board, 10);
});

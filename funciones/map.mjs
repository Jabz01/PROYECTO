import { Board } from './board.mjs';
import { Piece, PieceType } from './piece.mjs';
import Vector2 from './vector2.mjs';
import { Bomb } from './bomb.mjs';
import { launchBomb } from './shoot.mjs';

document.addEventListener("DOMContentLoaded", () => {
    const board = new Board();

    function createMap(board, size) {
        const mapElement = document.getElementById("map");

        mapElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        mapElement.style.gridTemplateRows = `repeat(${size}, 1fr)`;

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const cell = document.createElement("div");
                cell.classList.add("cell", "a");
                cell.dataset.x = x;
                cell.dataset.y = y;
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
                        cell.classList.remove("a");
                        cell.classList.add("p1");
                    }
                }
            }
        });

        board.launchedBombs.forEach(bomb => {
            const cell = document.querySelector(`.cell[data-x="${bomb.position.x}"][data-y="${bomb.position.y}"]`);
            if (cell) {
                if (cell.classList.contains("a")) {
                    cell.classList.remove("a");
                    cell.classList.add("b");
                } else if (cell.classList.contains("p1")) {
                    cell.classList.add("p1-h");
                }
            }
        });
    }

    board.pieces.push(new Piece(new Vector2(2, 3), false, 4));
    board.pieces.push(new Piece(new Vector2(5, 5), true, 3));

    launchBomb(board, new Vector2(6, 5));
    launchBomb(board, new Vector2(2, 3));
    launchBomb(board, new Vector2(8, 8));

    createMap(board, 10);
});
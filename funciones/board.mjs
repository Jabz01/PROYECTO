import { Piece } from "./piece.mjs";
import { Bomb, BombState } from "./bomb.mjs"
import Vector2 from "./vector2.mjs";

function isCollide(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

class Board {
    pieces = []
    launchedBombs = []

    /**
     * Says if it's possible to place a new piece in a board without any overlapping.
     * @param {Piece} piece The new piece
     */
    canPlacePiece(piece) {
        for (const m_piece of this.pieces) {
            if (isCollide(
                piece.getRect(), m_piece.getRect()
            ))
            {
                return false;
            }
        }
        return true;
    }

    renderOn(mapID, mapSize, customListener = null, renderPieces = true) {
        const mapElement = document.getElementById(mapID);
    
        if (!mapElement) {
            console.error(`No se encontró el elemento con id "${mapID}".`);
            return;
        }
    
        mapElement.innerHTML = ""; // Vaciar el contenedor antes de renderizar
        mapElement.style.gridTemplateColumns = `repeat(${mapSize}, 1fr)`; 
        mapElement.style.gridTemplateRows = `repeat(${mapSize}, 1fr)`; 
    
        for (let y = 0; y < mapSize; y++) {
            for (let x = 0; x < mapSize; x++) {
                const cell = document.createElement("div");
                cell.classList.add("cell", "a");
                cell.classList.add((x + y) % 2 ? "even-cell" : "odd-cell", "a");
                cell.dataset.x = x;
                cell.dataset.y = y;
    
                if (customListener) {
                    cell.addEventListener("click", () => customListener(x, y));
                }
    
                mapElement.appendChild(cell);
            }
        }

        if (renderPieces)
        {
            this.pieces.forEach(piece => {
                const x1 = piece.position.x;
                const y1 = piece.position.y;
                const x2 = piece.isVertical ? x1 : x1 + piece.size - 1;
                const y2 = piece.isVertical ? y1 + piece.size - 1 : y1;
    
                for (let x = x1; x <= x2; x++) {
                    for (let y = y1; y <= y2; y++) {
                        const cell = document.querySelector(
                            `#${mapID}>.cell[data-x="${x}"][data-y="${y}"]`
                        );
                        if (cell) {
                            cell.classList.add("piece", "p1");
                            cell.classList.remove("a");
    
                            // Añadir clases específicas para las esquinas
                            if (x === x1 && y === y1) {
                                cell.classList.add(
                                    piece.isVertical ? "vertical" : "horizontal",
                                    "start"
                                );
                            } else if (x === x2 && y === y2) {
                                cell.classList.add(
                                    piece.isVertical ? "vertical" : "horizontal",
                                    "end"
                                );
                            }
                        }
                    }
                }
            });
        }

        this.launchedBombs.forEach(bomb => {
            const x = bomb.position.x;
            const y = bomb.position.y;

            const cell = document.querySelector(
                `#${mapID}>.cell[data-x="${x}"][data-y="${y}"]`
            );

            if (cell) {
                if (bomb.state == BombState.ADJACENT)
                {
                    cell.classList.add("adjacent");
                }
                if (bomb.state == BombState.FIRE_IN_THE_HOLE)
                {
                    cell.classList.add("fire");
                }
                cell.classList.add("b");
                cell.classList.remove("a");
            }
        });
    }

    reset()
    {
        this.pieces = []
        this.launchedBombs = []
    }
}

/**
 * Función para guardar el estado del mapa del usuario en local storage.
 * @param {Board} board - Estado actual del mapa del usuario.
 */
function saveBoard(board, key = "userMapState") {
    localStorage.setItem(key, JSON.stringify(board));
    console.log("Estado del mapa del usuario guardado en local storage.");
}

/**
 * Función para cargar el estado de las pieces del usuario desde local storage.
 * @returns {Board|null} Estado del mapa o null si no existe.
 */
function loadBoard(key = "userMapState") {
    const savedState = localStorage.getItem(key);
    let boardData = savedState ? JSON.parse(savedState) : null;
    let board = new Board();
    board.pieces = boardData.pieces.map(x => {
        return new Piece(
            new Vector2(x.position.x, x.position.y), 
            x.isVertical, x.size);
    });
    board.launchedBombs = boardData.launchedBombs;
    return board;
}

export { Board, saveBoard, loadBoard };
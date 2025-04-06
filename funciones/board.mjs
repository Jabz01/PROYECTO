import { Piece } from "./piece.mjs";

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

    renderOn(mapID, mapSize, customListener = null) {
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
                cell.dataset.x = x;
                cell.dataset.y = y;
    
                if (customListener) {
                    cell.addEventListener("click", () => customListener(x, y));
                }
    
                mapElement.appendChild(cell);
            }
        }
    }
}

export { Board }; // ✅ Exportación correcta para ES Modules
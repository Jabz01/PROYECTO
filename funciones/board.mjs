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
}

export { Board }; // ✅ Exportación correcta para ES Modules
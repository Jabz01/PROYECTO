const { Vector2 } = require("./vector2")

const PieceType = {
    SUBMARINE: 0,
    SHIP: 1
}

class Piece {
    position = new Vector2(0, 0);
    isVertical = false
    size = 3;
    type = PieceType.SHIP

    constructor(position, isVertical, size) {
        this.position = position
        this.isVertical = isVertical
        this.size = size
    }
}

exports.PieceType = PieceType;
exports.Piece = Piece;
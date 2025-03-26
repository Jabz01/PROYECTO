import  Vector2 from "./vector2.mjs";

const PieceType = {
    SUBMARINE: 0,
    SHIP: 1
};

class Piece {
    position = new Vector2(0, 0);
    isVertical = false;
    size = 3;
    type = PieceType.SHIP;

    constructor(position, isVertical, size) {
        this.position = position;
        this.isVertical = isVertical;
        this.size = size;
    }

    getRect() {
        return {
            x: this.position.x,
            y: this.position.y,
            width: this.position.x + Math.max(this.isVertical ? 1 : this.size, 0) - this.position.x,
            height: this.position.y + Math.max(!this.isVertical ? 1 : this.size, 0) - this.position.y
        };
    }
}

// ✅ Exportación compatible con ES Modules
export { PieceType, Piece };
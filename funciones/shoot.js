const { Vector2 } = require("./vector2")
const { Board } = require("./board")
const { Bomb, BombState } = require("./bomb")

/**
 * Lanza una bomba en el tablero
 * @param {Board} board Tablero
 * @param {Vector2} position Posición de lanzamiento de la bomba
 * @returns {Bomb | null} Una bomba con su estado de adyacencia calculado para el tablero. Retorna null si no fue posible lanzar la bomba.
 */
function launchBomb(board, position)
{
    let bomb = new Bomb(position);

    /**
     * ¿Para qué lanzar una bomba dos veces en el mismo lugar?
     */
    for (const bomb of board.launchedBombs) {
        if (bomb.position.x == position.x && bomb.position.y == position.y)
        {
            return null;
        }
    }

    board.pieces.forEach(piece => {
        let x1 = piece.position.x;
        let x2 = piece.position.x + Math.max(piece.isVertical ? 0 : piece.size - 1, 0);

        let y1 = piece.position.y;
        let y2 = piece.position.y + Math.max(!piece.isVertical ? 0 : piece.size - 1, 0);
        
        let deltaX = Math.max(
            x1 - bomb.position.x,
            bomb.position.x - x2,
            0
        );

        let deltaY = Math.max(
            y1 - bomb.position.y,
            bomb.position.y - y2,
            0
        );

        if (deltaX == 0 && deltaY == 0 && bomb.state != BombState.ADJACENT)
        {
            bomb.state = BombState.FIRE_IN_THE_HOLE;
        }
        else if (deltaX <= 1 && deltaY <= 1)
        {
            bomb.state = BombState.ADJACENT;
        }
    });

    board.launchedBombs.push(bomb);

    return bomb;
}

exports.launchBomb = launchBomb;

/* EJEMPLO DE USO */

/*
let board = new Board()

board.pieces = [
    new Piece(new Vector2(0,0), true, 3),
    new Piece(new Vector2(3,4), false, 2),
]

console.log(board);
console.log( launchBomb(board, new Vector2(0,0)) );
console.log(board);
// ¿Para qué lanzar una bomba dos veces en el mismo lugar?
console.log( launchBomb(board, new Vector2(0,0)) );
console.log(board);
*/
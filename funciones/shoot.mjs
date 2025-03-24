import  Vector2 from "./vector2.mjs";
import { Board } from "./board.mjs";
import { BombState, Bomb } from "./bomb.mjs";

/**
 * Lanza una bomba en una posición dentro de un tablero.
 * @advice Esto agrega la bomba al array de bombas lanzadas del tablero.
 * @param {Board} board - El tablero donde se lanza la bomba.
 * @param {Vector2} position - Las coordenadas donde se lanza la bomba.
 * @returns {Bomb|null} - Una referencia al nuevo objeto bomba, o `null` si la posición ya tenía una bomba.
 */
function launchBomb(board, position) {
    let bomb = new Bomb(position);

    /**
     * ¿Para qué lanzar una bomba dos veces en el mismo lugar?
     */
    for (const existingBomb of board.launchedBombs) {
        if (existingBomb.position.x === position.x && existingBomb.position.y === position.y) {
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

        if (deltaX === 0 && deltaY === 0 && bomb.state !== BombState.ADJACENT) {
            bomb.state = BombState.FIRE_IN_THE_HOLE;
        } else if (deltaX <= 1 && deltaY <= 1) {
            bomb.state = BombState.ADJACENT;
        }
    });

    board.launchedBombs.push(bomb);

    return bomb;
}

// ✅ Exportación compatible con ES Modules
export { launchBomb };

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
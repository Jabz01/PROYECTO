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
        let rect = piece.getRect();

        let x1 = rect.x;
        let y1 = rect.y;
        let x2 = rect.x + rect.width;
        let y2 = rect.y + rect.height;
        
        if (
            position.x >= x1 && position.x < x2 &&
            position.y >= y1 && position.y < y2
        )
        {
            bomb.state = BombState.FIRE_IN_THE_HOLE;
        }
        else if (
            position.x >= x1 - 1 && position.x < x2 + 1 &&
            position.y >= y1 - 1 && position.y < y2 + 1 &&
            bomb.state != BombState.FIRE_IN_THE_HOLE
        )
        {
            bomb.state = BombState.ADJACENT;
        }
    });

    board.launchedBombs.push(bomb);

    return bomb;
}

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
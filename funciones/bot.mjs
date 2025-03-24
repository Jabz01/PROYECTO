import { Board } from "./board.mjs";
import Vector2 from "./vector2.mjs";
import { Piece } from "./piece.mjs";
import { Bomb } from "./bomb.mjs";
import { launchBomb } from "./shoot.mjs";

/**
 * Lanza una bomba en una posición aleatoria dentro de un tablero.
 * @advice Esto añade la bomba al array de bombas del tablero.
 * @param {Board} board El tablero donde lanzar la bomba.
 * @param {Vector2} dimensions Las dimensiones del tablero.
 * @returns Una referencia al nuevo objeto bomba.
 */
function launchRandomBomb(board, dimensions) {
    let position = new Vector2(0, 0);
    let bomb = null;

    while (bomb === null) {
        position = new Vector2(
            Math.floor(Math.random() * dimensions.x),
            Math.floor(Math.random() * dimensions.y)
        );

        bomb = launchBomb(board, position);
    }

    return bomb;
}

/**
 * Crea un nuevo tablero basado en otro, asegurando que las piezas nuevas no se superpongan.
 * @param {Board} playerBoard El tablero base (generalmente el del jugador).
 * @param {Vector2} dimensions Las dimensiones del tablero.
 * @returns {Board} El nuevo tablero generado.
 */
function createBoard(playerBoard, dimensions) {
    let botBoard = new Board();
    let sizes = [5, 4, 3, 3, 2, 2];

    for (const size of sizes) {
        let piece = new Piece(new Vector2(0, 0), false, size);
        do {
            piece.isVertical = Math.random() >= 0.5;
            let { width, height } = piece.getRect();
            piece.position = new Vector2(
                Math.min(Math.floor(Math.random() * dimensions.x), dimensions.x - width),
                Math.min(Math.floor(Math.random() * dimensions.y), dimensions.y - height)
            );
        } while (!playerBoard.canPlacePiece(piece) || !botBoard.canPlacePiece(piece));

        botBoard.pieces.push(piece);
    }

    return botBoard;
}

// ✅ Exportación compatible con ES Modules
export { launchRandomBomb, createBoard };
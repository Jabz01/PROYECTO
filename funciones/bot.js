const { Board } = require("./board")
const { Vector2 } = require("./vector2")
const { Piece } = require("./piece")
const { Bomb } = require("./bomb");
const { launchBomb } = require("./shoot")

/**
 * Launchs a bomb in a random position within a board
 * @advice This adds the bomb to the board bomb's array
 * @param {Board} board The board to launch the bomb
 * @param {Vector2} dimensions The dimensions of the board
 * @returns A new bomb object reference
 */
function launchRandomBomb(board, dimensions)
{
    let position = new Vector2(0, 0);
    let bomb = null;

    while (bomb === null)
    {
        position = new Vector2(
            Math.floor( Math.random() * ( dimensions.x ) ),
            Math.floor( Math.random() * ( dimensions.y ) )
        );

        bomb = launchBomb(board, position);
    }

    return bomb
}

/**
 * Creates a new board based on an old board in a way that the new pieces are not overlaped.
 * @param {Board} playerBoard The board for constructing the new one, tipically, this is the player one.
 * @param {Vector2} dimensions The dimensions of the board
 * @returns 
 */
function createBoard(playerBoard, dimensions)
{
    let botBoard = new Board();
    let sizes = [5, 4, 3, 3, 2, 2]

    for (const size of sizes) {
        let piece = new Piece(new Vector2(0,0), false, size);
        do {
            piece.isVertical = Math.random() >= 0.5;
            let {width, height} = piece.getRect();
            piece.position = new Vector2(
                Math.min(Math.floor( Math.random() * ( dimensions.x ) ), dimensions.x - width ),
                Math.min(Math.floor( Math.random() * ( dimensions.y ) ), dimensions.y - height )
            );
        } while (!playerBoard.canPlacePiece(piece) || !botBoard.canPlacePiece(piece));

        botBoard.pieces.push(piece);
    }

    return botBoard;
}

exports.launchRandomBomb = launchRandomBomb;
exports.createBoard = createBoard;
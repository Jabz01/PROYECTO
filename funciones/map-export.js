const { Board } = require("./board")
const { Vector2 } = require("./vector2")
const { Piece } = require("./piece")
const { Bomb } = require("./bomb");

/**
 * Writes the positions of the given pieces into the matrix.
 * 
 * @param {string[][]} matrix - The game matrix where the pieces are placed.
 * @param {Piece[]} pieces - The array of pieces to be written to the matrix.
 * @param {Vector2} dimensions - The dimensions of the board.
 * @param {string} name - The identifier to mark the pieces in the matrix.
 */
function writePieces(matrix, pieces, dimensions, name)
{
    /**
     * Eficiency in this thing... 😈🤫
     */
    pieces.forEach(piece => {
        let x1 = piece.position.x;
        let x2 = piece.position.x + Math.max(piece.isVertical ? 0 : piece.size - 1, 0);

        let y1 = piece.position.y;
        let y2 = piece.position.y + Math.max(!piece.isVertical ? 0 : piece.size - 1, 0);

        for (let x = x1; x <= x2 && x < dimensions.x && x >= 0; x++)
        {
            for (let y = y1; y <= y2 && y < dimensions.y && y >= 0; y++)
            {
                matrix[y][x] = name;
            }
        }
    });
}

/**
 * Marks the bomb positions in the matrix.
 * 
 * @param {string[][]} matrix - The game matrix where bombs are placed.
 * @param {Bomb[]} bombs - The array of bombs to be placed in the matrix.
 * @param {Vector2} dimensions - The dimensions of the board.
 */
function writeBombs(matrix, bombs, dimensions)
{
    bombs.forEach(bomb => {
        if (
            bomb.position.x >= 0 && bomb.position.x < dimensions.x &&
            bomb.position.y >= 0 && bomb.position.y < dimensions.y &&
            !["a", "b"].includes(matrix[ bomb.position.y ][ bomb.position.x ]) &&
            !matrix[ bomb.position.y ][ bomb.position.x ].includes("h")
        )
        {
            matrix[ bomb.position.y ][ bomb.position.x ] += "-h";
        }
    })
}


/**
 * Generates a matrix representation of the game board.
 * 
 * @param {Board} playerBoard - The board state of the player.
 * @param {Board} botBoard - The board state of the bot.
 * @param {Vector2} dimensions - The dimensions of the board.
 * @returns {string[][]} - The game board as a matrix.
 */
function exportMap(playerBoard, botBoard, dimensions)
{
    let matrix = Array(dimensions.y)
        .fill()
        .map(()=>Array(dimensions.x).fill("a"));
    
    writePieces(matrix, playerBoard.pieces, dimensions, "p1");
    writePieces(matrix, botBoard.pieces, dimensions, "p2");
    writeBombs(matrix, playerBoard.launchedBombs, dimensions);
    writeBombs(matrix, botBoard.launchedBombs, dimensions);
    
    return matrix;
}

/**
 * Exports the game board as a JSON string.
 * 
 * @param {Board} playerBoard - The board state of the player.
 * @param {Board} botBoard - The board state of the bot.
 * @param {Vector2} dimensions - The dimensions of the board.
 * @returns {string} - The JSON representation of the game board.
 */
function exportMapAsJSON(playerBoard, botBoard, dimensions)
{
    return JSON.stringify(exportMap(playerBoard, botBoard, dimensions));
}

/*

// USAGE EXAMPLE

const { launchBomb } = require("./shoot");

let playerBoard = new Board()

playerBoard.pieces = [
    new Piece(new Vector2(0,0), true, 3),
    new Piece(new Vector2(3,4), false, 2),
]

let botBoard = new Board()

botBoard.pieces = [
    new Piece(new Vector2(1,0), false, 3),
    new Piece(new Vector2(2,2), false, 2),
]

launchBomb(playerBoard, new Vector2(0,0));
launchBomb(botBoard, new Vector2(0,0));

console.log(exportMap(playerBoard, botBoard , new Vector2(5, 5)));
console.log(exportMapAsJSON(playerBoard, botBoard , new Vector2(5, 5)));
*/
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
            !matrix[ bomb.position.y ][ bomb.position.x ].includes("h")
        )
        {
            if (matrix[ bomb.position.y ][ bomb.position.x ] == "a")
            {
                matrix[ bomb.position.y ][ bomb.position.x ] = "b";
            }
            else
            {
                matrix[ bomb.position.y ][ bomb.position.x ] += "-h";
            }
        }
    })
}


/**
 * Generates a matrix representation of the game board.
 * @description Use this for generating both player and AI maps separatedly.
 * 
 * @param {Board} board - The board state.
 * @param {Vector2} dimensions - The dimensions of the board.
 * @param {string} name - The identifier to mark the pieces.
 * @returns {string[][]} - The game board as a matrix.
 */
function exportMap(board, dimensions, name)
{
    let matrix = Array(dimensions.y)
        .fill()
        .map(()=>Array(dimensions.x).fill("a"));
    
    writePieces(matrix, board.pieces, dimensions, name);
    writeBombs(matrix, board.launchedBombs, dimensions);
    
    return matrix;
}

/**
 * Exports the game board as a JSON string.
 * 
 * @param {Board} board - The board state.
 * @param {Vector2} dimensions - The dimensions of the board.
 * @param {string} name - The identifier to mark the pieces.
 * @returns {string} - The JSON representation of the game board.
 */
function exportMapAsJSON(board, dimensions, name)
{
    return JSON.stringify(exportMap(board, dimensions, name));
}

exports.exportMap = exportMap;
exports.exportMapAsJSON = exportMapAsJSON;

/*
// USAGE EXAMPLE

const { launchRandomBomb } = require("./bot")

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

for (let i = 0; i < 5; i++)
{
    launchRandomBomb(botBoard, new Vector2(5,5));
    launchRandomBomb(playerBoard, new Vector2(5,5));
}

console.log(exportMap(playerBoard, new Vector2(5, 5), "p1"));
console.log(exportMapAsJSON(botBoard, new Vector2(5, 5), "p2"));
*/
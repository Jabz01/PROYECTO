import { Board } from "./board.mjs";
import Vector2 from "./vector2.mjs";
import { Piece } from "./piece.mjs";
import { Bomb } from "./bomb.mjs";

/**
 * Escribe las posiciones de las piezas en la matriz del juego.
 * 
 * @param {string[][]} matrix - Matriz donde se colocarán las piezas.
 * @param {Piece[]} pieces - Array de piezas a colocar en la matriz.
 * @param {Vector2} dimensions - Dimensiones del tablero.
 * @param {string} name - Identificador para marcar las piezas en la matriz.
 */
function writePieces(matrix, pieces, dimensions, name) {
    pieces.forEach(piece => {
        let x1 = piece.position.x;
        let x2 = piece.position.x + Math.max(piece.isVertical ? 0 : piece.size - 1, 0);
        let y1 = piece.position.y;
        let y2 = piece.position.y + Math.max(!piece.isVertical ? 0 : piece.size - 1, 0);

        for (let x = x1; x <= x2 && x < dimensions.x && x >= 0; x++) {
            for (let y = y1; y <= y2 && y < dimensions.y && y >= 0; y++) {
                matrix[y][x] = name;
            }
        }
    });
}

/**
 * Marca las posiciones de las bombas en la matriz del juego.
 * 
 * @param {string[][]} matrix - Matriz del juego donde se colocarán las bombas.
 * @param {Bomb[]} bombs - Array de bombas a colocar en la matriz.
 * @param {Vector2} dimensions - Dimensiones del tablero.
 */
function writeBombs(matrix, bombs, dimensions) {
    bombs.forEach(bomb => {
        if (
            bomb.position.x >= 0 && bomb.position.x < dimensions.x &&
            bomb.position.y >= 0 && bomb.position.y < dimensions.y &&
            !matrix[bomb.position.y][bomb.position.x].includes("h")
        ) {
            if (matrix[bomb.position.y][bomb.position.x] == "a") {
                matrix[bomb.position.y][bomb.position.x] = "b";
            } else {
                matrix[bomb.position.y][bomb.position.x] += "-h";
            }
        }
    });
}

/**
 * Genera una representación matricial del tablero de juego.
 * @description Se usa para generar mapas tanto para el jugador como para la IA.
 * 
 * @param {Board} board - Estado del tablero.
 * @param {Vector2} dimensions - Dimensiones del tablero.
 * @param {string} name - Identificador para marcar las piezas.
 * @returns {string[][]} - Matriz del juego.
 */
function exportMap(board, dimensions, name) {
    let matrix = Array(dimensions.y)
        .fill()
        .map(() => Array(dimensions.x).fill("a"));
    
    writePieces(matrix, board.pieces, dimensions, name);
    writeBombs(matrix, board.launchedBombs, dimensions);
    
    return matrix;
}

/**
 * Exporta el tablero del juego como una cadena JSON.
 * 
 * @param {Board} board - Estado del tablero.
 * @param {Vector2} dimensions - Dimensiones del tablero.
 * @param {string} name - Identificador para marcar las piezas.
 * @returns {string} - Representación JSON del tablero del juego.
 */
function exportMapAsJSON(board, dimensions, name) {
    return JSON.stringify(exportMap(board, dimensions, name));
}

// ✅ Exportación compatible con ES Modules
export { exportMap, exportMapAsJSON };

/*
// USAGE EXAMPLE

const { launchRandomBomb, createBoard } = require("./bot")
const { canPlacePiece } = require("./board");
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

console.log(exportMapAsJSON(playerBoard, new Vector2(10, 10), "p1"));
console.log(exportMapAsJSON( createBoard(playerBoard, new Vector2(10, 10)), new Vector2(10, 10), "p1"));
*/
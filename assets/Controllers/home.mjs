import { Board } from "../../funciones/board.mjs";
import { createBoard } from "../../funciones/bot.mjs";

document.addEventListener('DOMContentLoaded', () => {
    let exampleMap = new Board();
    let MapWithPieces = createBoard(exampleMap, { x: 10, y: 10 });
    const exitButton = document.getElementById("exitButton");
    MapWithPieces.renderOn("battleMapContainer", 10, null, true);

    exitButton.addEventListener("click", () => {
        localStorage.clear();

    });
    
});
import { Board, loadBoard } from '../../funciones/board.mjs';
import Vector2 from '../../funciones/vector2.mjs';
import { launchBomb } from "./../../funciones/shoot.mjs"
import { createBoard, launchRandomBomb } from "./../../funciones/bot.mjs"
import { BombState } from '../../funciones/bomb.mjs';

let mapSize = 10;

let userMap = null;
let botMap = null;
let won = false;

const turnMessages = [
    "Estoy pensando...",
    "Solo una bomba más",
    "Fire in the hole!",
]

function getPoints(botBoard) {
    let points = 0;
    for (let bomb of botBoard.launchedBombs) {
        switch (bomb.state) {
            case BombState.FAILED: points -= 1; break;
            case BombState.ADJACENT: points -= 3; break;
            case BombState.FIRE_IN_THE_HOLE: points += 10; break;
            default:
                break;
        }
    }

    return points;
}

function registerPoints() {
    let points = getPoints(botBoard);

}

function effectiveHits(board) {
    let hits = 0;

    board.launchedBombs.forEach(bomb => {
        if (bomb.state == BombState.FIRE_IN_THE_HOLE) {
            hits++;
        }
    });

    return hits;
}

function checkForWin() {
    let userHits = effectiveHits(userMap);
    let botHits = effectiveHits(botMap);

    if (userHits >= 19 || botHits >= 19) {
        document.getElementById("win-overlay").classList.remove("unabled");
        document.getElementById("win-message").innerHTML = (botHits >= 19 ? "¡Ganaste! Severo tryhard" : "El bot ha ganado esta vez, pero... regresamos mañana 🤑") + "\nTienes " + getPoints(botMap) + " puntos";
        botMap.renderOn("botMap", mapSize);
        registerPoints()

        return true
    }

    return false
}

function takeBotTurn() {
    document.getElementById("overlay").innerHTML = turnMessages[Math.floor(Math.random() * turnMessages.length)];
    document.getElementById("overlay").classList.remove("unabled");

    setTimeout(() => {
        launchRandomBomb(userMap, new Vector2(mapSize, mapSize))

        setTimeout(() => {
            document.getElementById("overlay").classList.add("unabled")
        }, 500);

        if (checkForWin()) {
            return
        }

        renderBoards();
    }, 500)
}

function launchBombAtEnemy(x, y) {
    let bomb = launchBomb(botMap, new Vector2(x, y));

    renderBoards();

    if (checkForWin() || !bomb) {
        return;
    }

    takeBotTurn();
}

function renderBoards() {
    userMap.renderOn("userMap", mapSize);
    botMap.renderOn("botMap", mapSize, launchBombAtEnemy, false);
}

document.addEventListener("DOMContentLoaded", () => {
    mapSize = JSON.parse(localStorage.getItem("mapSize"));
    userMap = loadBoard();
    botMap = createBoard(userMap, new Vector2(mapSize, mapSize));

    renderBoards();
})
import { BombState } from "./bomb.mjs";

function calculateScore(board) {
    let points = 0;
    for (let bomb of board.launchedBombs) {
        switch (bomb.state) {
            case BombState.FAILED:
                points -= 1;
                break;
            case BombState.ADJACENT:
                points -= 3;
                break;
            case BombState.FIRE_IN_THE_HOLE:
                points += 10;
                break;
            default:
                break;
        }
    }
    return points;
}

function displayScore(points) {
    const scoreElement = document.getElementById("final-score"); //Se supone que el HTML tendra un
                                //Con este id
    if (scoreElement) {
        scoreElement.textContent = `Puntaje final: ${points}`;
    }
}

function finalizeScore(board) { //Función a llamar para mostrar puntaje
    const points = calculateScore(board);
    displayScore(points);
}

export { calculateScore, displayScore, finalizeScore };
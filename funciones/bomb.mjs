import Vector2 from "./vector2.mjs";

const BombState = {
    FAILED: 0,
    ADJACENT: 1,
    FIRE_IN_THE_HOLE: 2
};

class Bomb {
    position = new Vector2(0, 0);
    state = BombState.FAILED;

    constructor(position) {
        this.position = position;
    }
}

function getPoints(botBoard)
{
  let points = 0;
  for (let bomb of botBoard.launchedBombs)
  {
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

// ✅ Exportación compatible con ES Modules
export { BombState, Bomb };
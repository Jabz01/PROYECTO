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

// ✅ Exportación compatible con ES Modules
export { BombState, Bomb };
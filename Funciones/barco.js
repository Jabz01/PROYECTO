const BombState = {
    FAILED: 0,
    ADJACENT: 1,
    FIRE_IN_THE_HOLE: 2
}

class Vector2
{
    x = 0;
    y = 0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Bomb {
    position = new Vector2(0, 0);
    state = BombState.FAILED;

    constructor(position) {
        this.position = position;
    }
}

class Piece {
    position = new Vector2(0, 0);
    isVertical = false
    size = 3;

    constructor(position, isVertical, size) {
        this.position = position
        this.isVertical = isVertical
        this.size = size
    }
}

/**
 #----
 #----
 #----
 -----
 ---##
 */

let playerBoard = [
    new Piece(new Vector2(0,0), true, 3),
    new Piece(new Vector2(3,4), false, 2),
]

/*
No sirve
*/
function launchBomb(board, position)
{
    let bomb = new Bomb(position)

    board.forEach(element => {
        let x1 = element.position.x;
        let x2 = element.position.x + Math.max(element.isVertical ? 0 : element.size - 1, 0);

        let y1 = element.position.y;
        let y2 = element.position.y + Math.max(!element.isVertical ? 0 : element.size - 1, 0);
        
        let deltaX = Math.max(
            x1 - bomb.position.x,
            bomb.position.x - x2,
            0
        );

        let deltaY = Math.max(
            y1 - bomb.position.y,
            bomb.position.y - y2,
            0
        );

        if (deltaX == 0 && deltaY == 0 && bomb.state != BombState.ADJACENT)
        {
            bomb.state = BombState.FIRE_IN_THE_HOLE
        }
        else if (deltaX <= 1 && deltaY <= 1)
        {
            bomb.state = BombState.ADJACENT
        }
    });

    return bomb;
}

console.log(launchBomb(playerBoard, new Vector2(0,0)));
console.log(launchBomb(playerBoard, new Vector2(1,3)));
console.log(launchBomb(playerBoard, new Vector2(2,3)));

/**
 Test con tablero virtual 5x5
 */

for (let i = 0; i < 5; i++)
{
    for (let j = 0; j < 5; j++)
    {
        process.stdout.write(
            launchBomb(playerBoard, new Vector2(j,i)).state +
            " ");
    }
    process.stdout.write("\n");
}
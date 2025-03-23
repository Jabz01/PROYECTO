const { Board } = require("./board")
const { Vector2 } = require("./vector2")
const { Piece } = require("./piece")
const { Bomb } = require("./bomb");
const { launchBomb } = require("./shoot")

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

exports.launchRandomBomb = launchRandomBomb;
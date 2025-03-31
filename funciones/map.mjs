import { Board } from './board.mjs';
import { Piece } from './piece.mjs';
import Vector2 from './vector2.mjs';
document.addEventListener("DOMContentLoaded", () => {
    const buttonDirection = document.getElementById("buttonDirection");
    const buttonReboot = document.getElementById("buttonReboot");
    const textReboot = document.getElementById("textReboot");
    let isVertical = false;
    let mapSize = 10; //Ejemplo pero este se debe globalizar
    
    let SHIPS_TO_PLACE = [
        { size: 5, count: 1 },
        { size: 4, count: 1 },
        { size: 3, count: 2 },
        { size: 2, count: 2 }
    ];

    let shipIndex = 0;
    const board = new Board();

    function createMap(mapSize) {
        const mapElement = document.getElementById("map");

        mapElement.innerHTML = "";

        mapElement.style.gridTemplateColumns = `repeat(${mapSize}, 1fr)`;
        mapElement.style.gridTemplateRows = `repeat(${mapSize}, 1fr)`;

        for (let y = 0; y < mapSize; y++) {
            for (let x = 0; x < mapSize; x++) {
                const cell = document.createElement("div");
                cell.classList.add("cell", "a");
                cell.dataset.x = x;
                cell.dataset.y = y;

                cell.addEventListener("click", () => placeShip(x, y));
                mapElement.appendChild(cell);
            }
        }
    }

    // Función para colocar barcos
    let alarm = true;
    function placeShip(x, y) {
        let size = getSizePiece();
        let OutOfCorner = isVertical   //Toma tamaño de la pieza junto su posición en x o y
            ? y + size > mapSize       //Segun si es vertical o no y lo compara con el  
            : x + size > mapSize;      //Tamaño del mapa para decir si se sale de la esquina
            
        if (size === null) {
            if(alarm) {
                alarm = false;
                alert("Ya no hay más barcos por colocar."); 
            }
            return;
        }
        if (OutOfCorner) {
            alert("El barco no se puede poner en esa posición, esta fuera de la esquina.");
            return;
        }
        
        
        const newPiece = new Piece(new Vector2(x, y), isVertical, size);
        // Verificar si el barco puede colocarse
        if (!board.canPlacePiece(newPiece)) {
            alert("No se puede colocar el barco en esta posición.");
            return;
        }
        
        
        
        
        board.pieces.push(newPiece);
        renderThePiece(board);
        updateShipCount();
        if (board.pieces.length == 1) {
            buttonReboot.classList.add("visibility");
        } 
        
        buttonRebootAppear();
    }

    // Obtener el tamaño del barco actual según el índice
    function getSizePiece() {
        if (shipIndex >= SHIPS_TO_PLACE.length) {
            return null;
        }

        let currentShip = SHIPS_TO_PLACE[shipIndex];

        if (currentShip.count > 0) {
            return currentShip.size;
        } else {
            shipIndex++;
            return getSizePiece(); // Llamada recursiva para buscar el siguiente barco disponible
        }
    }

    // Actualizar el tablero después de colocar un barco
    function renderThePiece(board) {
        board.pieces.forEach(piece => {
            let x1 = piece.position.x;
            let x2 = piece.isVertical ? x1 : x1 + piece.size - 1;
            let y1 = piece.position.y;
            let y2 = piece.isVertical ? y1 + piece.size - 1 : y1;

            for (let x = x1; x <= x2; x++) {
                for (let y = y1; y <= y2; y++) {
                    const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
                    if (cell) {
                        cell.classList.remove("a");
                        cell.classList.add("p1");
                    }
                }
            }
        });
    }

    // Cambiar la dirección del barco (vertical/horizontal)
    function ChangeDirection() {
        isVertical = !isVertical;
        buttonDirection.textContent = isVertical ? "Dirección: Vertical" : "Dirección: Horizontal";
    }

    // Reducir la cantidad de barcos restantes en `SHIPS_TO_PLACE`
    function updateShipCount() {
        const currentShip = SHIPS_TO_PLACE[shipIndex];
        currentShip.count--;
        if (currentShip.count === 0) {
            shipIndex++;
        }
    }

    function RebootPieces() {
        shipIndex = 0;
        board.pieces = []; 
        alarm = true; 
        createMap(mapSize); 
        SHIPS_TO_PLACE = [
            { size: 5, count: 1 },
            { size: 4, count: 1 },
            { size: 3, count: 2 },
            { size: 2, count: 2 }
        ];
        buttonReboot.classList.remove("visibility");
    }





    // Agregar evento al botón para cambiar la dirección del barco
    buttonDirection.addEventListener("click", ChangeDirection);
    buttonReboot.addEventListener("click", RebootPieces);

    createMap(mapSize);
});
    /*         board.launchedBombs.forEach(bomb => {
                const cell = document.querySelector(`.cell[data-x="${bomb.position.x}"][data-y="${bomb.position.y}"]`);
                if (cell) {
                    if (cell.classList.contains("a")) {
                        cell.classList.remove("a");
                        cell.classList.add("b");
                    } else if (cell.classList.contains("p1")) {
                        cell.classList.add("p1-h");
                    }
                }
            }); */
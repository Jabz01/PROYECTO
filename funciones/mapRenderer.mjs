import { Board } from './board.mjs';
import { Piece } from './piece.mjs';
import Vector2 from './vector2.mjs';

export default class MapRender {
    constructor(mapId, mapSize, isUserMap = true, isVertical = false, alarm = true) {
        this.mapId = mapId; // ID del elemento HTML que contendrá el mapa
        this.mapSize = mapSize; // Tamaño del mapa (ancho y alto en celdas)
        this.isUserMap = isUserMap; // Si el mapa es del usuario
        this.isVertical = isVertical; // Dirección inicial de los barcos
        this.alarm = alarm; // Bandera para controlar las alertas
        this.SHIPS_TO_PLACE = [ // Lista de barcos por colocar
            { size: 5, count: 1 },
            { size: 4, count: 1 },
            { size: 3, count: 2 },
            { size: 2, count: 2 }
        ];
        this.shipIndex = 0; // Índice del barco actual que se está colocando
        this.board = new Board(); // Tablero asociado a este renderizador
    }

    // Método para renderizar el mapa en el HTML
    mapRender() {
        const mapElement = document.getElementById(this.mapId);
    
        if (!mapElement) {
            console.error(`No se encontró el elemento con id "${this.mapId}".`);
            return;
        }
    
        mapElement.innerHTML = ""; // Vaciar el contenedor antes de renderizar
        mapElement.style.gridTemplateColumns = `repeat(${this.mapSize}, 1fr)`; 
        mapElement.style.gridTemplateRows = `repeat(${this.mapSize}, 1fr)`; 
    
        for (let y = 0; y < this.mapSize; y++) {
            for (let x = 0; x < this.mapSize; x++) {
                const cell = document.createElement("div");
                cell.classList.add("cell", "a");
                cell.dataset.x = x;
                cell.dataset.y = y;
    
                if (this.isUserMap) {
                    cell.addEventListener("click", () => this.placeShip(x, y));
                }
    
                mapElement.appendChild(cell);
            }
        }
    }
    

    // Método para colocar barcos
    placeShip(x, y) {
        const size = this.getSizePiece();
        const outOfBounds = this.isOutOfBounds(x, y, size);
        const canPlace = this.board.canPlacePiece(
            new Piece(new Vector2(x, y), this.isVertical, size)
        );

        if (size === null) {
            if (this.alarm) {
                this.alarm = false;
                alert("Ya no hay más barcos por colocar.");
            }
            return;
        }

        if (outOfBounds) {
            alert("El barco no se puede poner en esa posición, está fuera de la esquina.");
            return;
        }

        if (!canPlace) {
            alert("No se puede colocar el barco en esta posición.");
            return;
        }

        // Colocar el barco
        const newPiece = new Piece(new Vector2(x, y), this.isVertical, size);
        this.board.pieces.push(newPiece);

        if (this.isUserMap) {
            this.renderThePiece();
        }

        this.updateShipCount();

    }

    // Verificar si un barco estaría fuera de los límites
    isOutOfBounds(x, y, size) {
        return this.isVertical
            ? y + size > this.mapSize
            : x + size > this.mapSize;
    }

    // Obtener el tamaño del próximo barco por colocar
    getSizePiece() {
        if (this.shipIndex >= this.SHIPS_TO_PLACE.length) {
            return null;
        }

        const currentShip = this.SHIPS_TO_PLACE[this.shipIndex];
        if (currentShip.count > 0) {
            return currentShip.size;
        } else {
            this.shipIndex++;
            return this.getSizePiece();
        }
    }

    // Renderizar las piezas en el mapa
    renderThePiece() {
        this.board.pieces.forEach(piece => {
            const x1 = piece.position.x;
            const y1 = piece.position.y;
            const x2 = piece.isVertical ? x1 : x1 + piece.size - 1;
            const y2 = piece.isVertical ? y1 + piece.size - 1 : y1;

            for (let x = x1; x <= x2; x++) {
                for (let y = y1; y <= y2; y++) {
                    const cell = document.querySelector(
                        `.cell[data-x="${x}"][data-y="${y}"]`
                    );
                    if (cell) {
                        cell.classList.add("piece", "p1");
                        cell.classList.remove("a");

                        // Añadir clases específicas para las esquinas
                        if (x === x1 && y === y1) {
                            cell.classList.add(
                                piece.isVertical ? "vertical" : "horizontal",
                                "start"
                            );
                        } else if (x === x2 && y === y2) {
                            cell.classList.add(
                                piece.isVertical ? "vertical" : "horizontal",
                                "end"
                            );
                        }
                    }
                    
                }
            }
        });
    }

    // Reducir la cantidad de barcos restantes
    updateShipCount() {
        const currentShip = this.SHIPS_TO_PLACE[this.shipIndex];
        currentShip.count--;
        if (currentShip.count === 0) {
            this.shipIndex++;
        }
    }

    // Reiniciar el mapa y los atributos relacionados
    RebootPieces() {
        this.shipIndex = 0;
        this.board.pieces = [];
        this.mapRender(); // Renderizar el mapa nuevamente
        this.SHIPS_TO_PLACE = [
            { size: 5, count: 1 },
            { size: 4, count: 1 },
            { size: 3, count: 2 },
            { size: 2, count: 2 }
        ];
        this.isVertical = false;
        this.alarm = true;
    }

        // Método para verificar si todos los barcos han sido colocados
    hasPlacedAllShips() {
        return this.shipIndex >= this.SHIPS_TO_PLACE.length;
    }

    // Método para guardar el estado del mapa (posiciones de las piezas)
    saveMapState() {
        return this.board.pieces.map(piece => ({
            x: piece.position.x,
            y: piece.position.y,
            isVertical: piece.isVertical,
            size: piece.size
        }));
    }
    loadUserMapState(state) {
        this.board.pieces = state.map(piece => ({
            position: new Vector2(piece.x, piece.y),
            isVertical: piece.isVertical,
            size: piece.size
        }));
        this.renderThePiece(); // Renderizar las piezas cargadas
    }


}
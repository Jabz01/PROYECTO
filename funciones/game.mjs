import MapRender from './mapRenderer.mjs';
import { Piece } from './piece.mjs';
import Vector2 from './vector2.mjs';

export default class Game {
    constructor(userMapId, botMapId, mapSize) {
        // Crear el mapa del usuario usando la clase MapRender
        this.userMap = new MapRender(userMapId, mapSize, true, false, true);
        this.currentTurn = "user"; // Turno inicial del usuario
    }

    // Crear el mapa del usuario
    render() {
        console.log("Iniciando el juego...");
        this.userMap.mapRender(); 
    }
    
    // Método para cargar el estado del mapa del usuario
    loadUserMapState(mapState) {
        mapState.forEach(({ x, y, isVertical, size }) => {
            const piece = new Piece(new Vector2(x, y), isVertical, size);
            this.userMap.board.pieces.push(piece);
        });
        this.userMap.renderThePiece(); // Renderiza las piezas en el mapa
    }


    // Método para gestionar el turno del usuario
    userAction(x, y) {
        console.log("El usuario lanza una acción...");
        // Lógica para manejar ataques o acciones en el mapa del bot (a implementar)
    }
    // Método para cambiar de turno
    nextTurn() {
        this.currentTurn = this.currentTurn === "user" ? "bot" : "user";
    }
}
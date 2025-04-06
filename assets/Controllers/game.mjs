import { Board } from '../../funciones/board.mjs';
import MapRender from '../../funciones/mapRenderer.mjs';
import { loadUserMapState } from "./userMap.mjs"

const mapSize = 10;

const userMapElement = document.getElementById("userMap");
const botMapElement = document.getElementById("botMap");

// if (userMapElement) {
//     const userMap = new MapRender(userMapElement.id, mapSize, true, false, true);
//     const Pieces = PiecesState();
//     userMap.loadUserMapState(Pieces); 
//     userMap.mapRender();
// } else {
//     console.error("No se encontró el contenedor del mapa del usuario con el ID 'userMap'.");
// }

// if (botMapElement) {
//     // Renderizar el mapa del bot vacío
//     const botMap = new MapRender(botMapElement.id, mapSize, false, false, false);
//     botMap.mapRender();
// } else {
//     console.error("No se encontró el contenedor del mapa del bot con el ID 'botMap'.");
// }

document.addEventListener("DOMContentLoaded", () => {
    const userMap = new Board();

    console.log(loadUserMapState());

    userMap.renderOn("userMap", mapSize, (x, y) => {
        console.log(x,y);
    });
})

console.log("Mapas y piezas renderizadas correctamente en game.html");
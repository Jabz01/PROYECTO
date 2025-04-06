import MapRender from '../../funciones/mapRenderer.mjs';

/**
 * Función para guardar el estado del mapa del usuario en local storage.
 * @param {Array} userMapState - Estado actual del mapa del usuario.
 */
function saveUserMapState(userMapState) {
    localStorage.setItem('userMapState', JSON.stringify(userMapState));
    console.log("Estado del mapa del usuario guardado en local storage.");
}

/**
 * Función para cargar el estado de las pieces del usuario desde local storage.
 * @returns {Array|null} Estado del mapa o null si no existe.
 */
function PiecesState() {
    const savedState = localStorage.getItem('userMapState');
    return savedState ? JSON.parse(savedState) : null;
}

// Inicializar el renderizador del mapa
document.addEventListener("DOMContentLoaded", () => {
    const buttonDirection = document.getElementById("buttonDirection");
    const buttonReboot = document.getElementById("buttonReboot");
    const buttonStartGame = document.getElementById("buttonStartGame");

    // Crear instancia de MapRender para el mapa del usuario
    const userMap = new MapRender("userMap", 10, true, false, true);


    // Renderizar el mapa
    userMap.mapRender();

    // Cambiar la dirección del barco
    buttonDirection.addEventListener("click", () => {
        userMap.isVertical = !userMap.isVertical;
        buttonDirection.textContent = userMap.isVertical
            ? "Dirección: Vertical"
            : "Dirección: Horizontal";

        buttonDirection.classList.toggle("horizontal", !userMap.isVertical);
        buttonDirection.classList.toggle("vertical", userMap.isVertical);
    });

    // Reiniciar el mapa
    buttonReboot.addEventListener("click", () => {
        userMap.RebootPieces(); // Reiniciar el mapa del usuario
        saveUserMapState([]); // Limpiar estado guardado en local storage
        console.log("Mapa reiniciado y estado eliminado del local storage.");
    });

    // Guardar el estado del mapa y comenzar el juego
    buttonStartGame.addEventListener("click", () => {
        if (userMap.hasPlacedAllShips()) {
            const userMapState = userMap.saveMapState(); // Obtener el estado del mapa
            console.log("Estado del mapa guardado:", userMapState);
            saveUserMapState(userMapState); // Guardar en local storage
    
            // Redireccionar al usuario a views/game.html
            window.location.href = "../views/game.html";
        } else {
            alert("Por favor, coloca todos los barcos antes de iniciar el juego.");
        }
    });
});

export { PiecesState };

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
import Game from '../../funciones/game.mjs';

document.addEventListener("DOMContentLoaded", () => {
    const buttonDirection = document.getElementById("buttonDirection");
    const buttonReboot = document.getElementById("buttonReboot");
    const buttonStartGame = document.getElementById("buttonStartGame");
    const gameController = new Game("userMap", "", 10);

    // Cambiar la dirección del barco
    buttonDirection.addEventListener("click", () => {
        gameController.userMap.isVertical = !gameController.userMap.isVertical;
        buttonDirection.textContent = gameController.userMap.isVertical
            ? "Dirección: Vertical"
            : "Dirección: Horizontal";

        buttonDirection.classList.toggle("horizontal", !gameController.userMap.isVertical);
        buttonDirection.classList.toggle("vertical", gameController.userMap.isVertical);
    });

    // Reiniciar el mapa
    buttonReboot.addEventListener("click", () => {
        gameController.userMap.RebootPieces(); // Reiniciar el mapa del usuario
        buttonDirection.textContent = "Dirección: Horizontal";
    });

    buttonStartGame.addEventListener("click", () => {
        if (gameController.userMap.hasPlacedAllShips()) {
            const userMapState = gameController.userMap.saveMapState(); // Guardar el estado del mapa del usuario
            console.log("Estado del mapa del usuario guardado:", userMapState);
    
            // Pasar el estado del mapa al controlador del juego
            gameController.loadUserMapState(userMapState);
    
        } else {
            alert("Por favor, coloca todos los barcos antes de iniciar el juego.");
        }
    });
    

    //Usamos gameController para crear el map, y así tener el codigo del mapa en un solo espacio
    gameController.render();
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
import MapRender from '../../funciones/mapRenderer.mjs';

document.addEventListener("DOMContentLoaded", () => {
    const buttonDirection = document.getElementById("buttonDirection");
    const buttonReboot = document.getElementById("buttonReboot");

    const USER_MAP = new MapRender("map", 10, true, false, true);

    // Cambiar la dirección del barco (vertical/horizontal)
    function ChangeDirection() {
        USER_MAP.isVertical = !USER_MAP.isVertical; 
        buttonDirection.textContent = USER_MAP.isVertical
            ? "Dirección: Vertical"
            : "Dirección: Horizontal";

        buttonDirection.classList.toggle("horizontal", !USER_MAP.isVertical);
        buttonDirection.classList.toggle("vertical", USER_MAP.isVertical);
    }

    // Reiniciar las piezas y el tablero
    function RebootPieces() {
        USER_MAP.RebootPieces(); 
        buttonDirection.textContent = "Dirección: Horizontal";
        
    }

    // Agregar eventos a los botones
    buttonDirection.addEventListener("click", ChangeDirection);
    buttonReboot.addEventListener("click", RebootPieces);

    USER_MAP.mapRender(); 
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
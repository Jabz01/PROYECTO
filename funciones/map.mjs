document.addEventListener("DOMContentLoaded", () => {
    /**
     * Generates a visual map for the game as an HTML grid.
     * 
     * @param {string} containerId - The ID of the container where the map will be rendered.
     * @param {number} rows - The number of rows in the map.
     * @param {number} columns - The number of columns in the map.
     */
    function generateInitialMap(containerId, rows, columns) {
        if (rows < 10 || rows > 20 || columns < 10 || columns > 20 || (rows != columns)) {
            throw new Error("El tamaño del mapa debe estar entre 10 y 20 para filas y columnas. Y deben ser las mismas filas y columnas.");
        }

        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`No se encontró el contenedor con ID '${containerId}'.`);
        }

        container.style.setProperty("--rows", rows);
        container.style.setProperty("--columns", columns);

        container.innerHTML = "";
        //Pasa por cada fila 
        for (let row = 0; row < rows; row++) {
            //Por cada columna que se haya ingresado se creara un div con la clase "cell" y la que indica su fila y columna
            for (let column = 0; column < columns; column++) {
                const cell = document.createElement("div"); 
                cell.className = `cell cell-${row}-${column}`; 
                container.appendChild(cell); 
            }
        }
    }

    document.getElementById("generateMapButton").addEventListener("click", () => {
        const rows = parseInt(document.getElementById("rowsInput").value);
        const columns = parseInt(document.getElementById("columnsInput").value);
        try {
            generateInitialMap("mapContainer", rows, columns);
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }
    });
});

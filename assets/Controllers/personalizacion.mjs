import  Helpers  from './helpers.mjs'
import Vector2 from '../../funciones/vector2.mjs';

Helpers.loadCountries();

class Options {
    constructor() {
        this._mapSize = new Vector2(0, 0); // Asegúrate de importar Vector2 si es necesario
        this._country = "";
    }

    // Getters
    get mapSize() {
        return this._mapSize;
    }

    get country() {
        return this._country;
    }

    static getRows() {
        return parseInt(document.querySelector('#rows').value) || 0;
    }
    
    static getCountry() {
        return document.querySelector("#countries").value;
    }

    // Setters
    set mapSize(value) {
        if (value instanceof Vector2) {
            this._mapSize = value;
        } else {
            throw new Error("mapSize debe ser una instancia de Vector2.");
        }
    }

    set country(value) {
        if (typeof value === "string") {
            this._country = value;
        } else {
            throw new Error("country debe ser una cadena de texto.");
        }
    }
}

document.querySelector("#rows").addEventListener("change", async (e) => {
    let value = document.querySelector("#rows").value;
    document.getElementById("row-number").innerHTML = value + "x" + value
})

document.querySelector(".play").addEventListener("click", async (e) => {
    e.preventDefault();
    const countrySelect = document.querySelector("#countries");


    // Validación del país
    if (countrySelect.value === "" || countrySelect.value === "Click para Expandir") {
        alert("Por favor seleccione un país");
        return;
    }

    console.log("enterrr");
    

    // Crear una nueva instancia de Options
    let options = new Options();

    // Obtener valores del formulario y asignarlos a la instancia
    options.mapSize = new Vector2(Options.getRows(), Options.getRows()); // ✅ Corrección aquí
    options.country = Options.getCountry();

    localStorage.setItem("mapSize", JSON.stringify(options.mapSize));
    localStorage.setItem("country", JSON.stringify(options.country));

    // Mostrar los valores en consola para verificar
    console.log("Map Size:", options.mapSize);
    console.log("Country:", options.country);

    window.location.href = "./userMap.html";
});

export { Options };

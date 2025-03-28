import  Helpers  from './helpers.mjs'
import Vector2 from '../../funciones/vector2.mjs';

class Customization {
    static async loadCountries() { 
        try {            
            let response = await fetch("http://127.0.0.1:5000/countries");

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            let data = await response.json();
            console.log(data);

            Helpers.fullSelectors("#countries", data, "Click para Expandir");
            
        } catch (error) {
            console.error("Error cargando países:", error);
            document.querySelector('#countries').innerHTML = `<option>Error al cargar países</option>`;
        }
    }
}

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
    
    static getColumns() {
        return parseInt(document.querySelector("#columns").value) || 0;
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

document.querySelector(".play").addEventListener("click", async (e) => {
    e.preventDefault();

    // Crear una nueva instancia de Options
    let options = new Options();

    // Obtener valores del formulario y asignarlos a la instancia
    options.mapSize = new Vector2(Options.getRows(), Options.getColumns()); // ✅ Corrección aquí
    options.country = Options.getCountry();

    // Mostrar los valores en consola para verificar
    console.log("Map Size:", options.mapSize);
    console.log("Country:", options.country);
});

Customization.loadCountries();

export { Options };

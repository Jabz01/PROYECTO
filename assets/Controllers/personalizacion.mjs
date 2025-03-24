import Helpers from './helpers.mjs'

class Costumization {

    static async cargarPaises() { 
        
        try {            
            let response = await fetch("http://127.0.0.1:5000/countries");
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            let data = await response.json();
            console.log(data);

            Helpers.fullSelectors("#paises", data, "Click para Expandir");
            
        } catch (error) {
            console.error("Error cargando países:", error);
            document.querySelector('#paises').innerHTML = `<option>Error al cargar países</option>`;
        }
    }
}

Costumization.cargarPaises();





import Helpers from '../Controllers/helpers'

class Personalizacion {

    static async cargarPaises() {
        let selectorPaises = document.querySelector('#paises');
        
        try {
            let response = await fetch("http://127.0.0.1:5000/countries");
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            let data = await response.json();

            selectorPaises.innerHTML = Helpers.toOptionList({
                items: data,
                value: 'Acronimo',
                text: 'nombre',
                firstOption: 'Elija un País',
            });
        } catch (error) {
            console.error("Error cargando países:", error);
            selectorPaises.innerHTML = `<option>Error al cargar países</option>`;
        }
    }
}

Personalizacion.cargarPaises();





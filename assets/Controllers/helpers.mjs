export default class Helpers {   
  
  /**
   * Llena un <select> con opciones basadas en los datos proporcionados.
   * @param {string} selectId - El selector CSS del <select>.
   * @param {Array} data - Array de objetos con clave-valor (ejemplo: [{ "US": "Estados Unidos" }]).
   * @param {string} firstOptionText - Texto de la primera opción (por defecto: "ingrese texto").
   */
  static fullSelectors(selectId, data, firstOptionText = "ingrese texto") {
      let select = document.querySelector(selectId);
      
      if (!select) {
          console.error(`Elemento '${selectId}' no encontrado.`);
          return;
      }
      
      if (!Array.isArray(data) || data.length === 0) {
          console.warn("Datos inválidos o vacíos.");
          return;
      }

      select.innerHTML = ""; // Limpiar select

      let firstOption = document.createElement("option");
      firstOption.value = "";
      firstOption.textContent = firstOptionText;
      select.appendChild(firstOption);

      // Agregar opciones del array de objetos
      data.forEach(item => {
          let entry = Object.entries(item)[0]; // Extraer clave-valor

          if (!entry) return; // Evitar errores si el objeto está vacío

          let [codigo, nombre] = entry;
          let option = document.createElement("option");
          option.value = codigo.toUpperCase();
          option.textContent = nombre;
          select.appendChild(option);
      });
  }

  static async loadCountries() { 
    try {            
        let response = await fetch("http://127.0.0.1:5000/countries");

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        let data = await response.json();
        console.log(data);

        Helpers.fullSelectors("#countries", data, "Click para Expandir");
        let countrySelect = document.querySelector("#countries");
        let flagImg = document.querySelector("#flag");

        // Agregar evento para actualizar la bandera en tiempo real
        countrySelect.addEventListener("change", () => {
        let country = countrySelect.value;

        if (country) {
            flagImg.src = `https://flagsapi.com/${country}/shiny/64.png`;
            flagImg.style.display = "block"; // Asegurar que la imagen sea visible
        } else {
            flagImg.src = "";
            flagImg.style.display = "none"; // Ocultar si no hay selección
        }
        });
        
    } catch (error) {
        console.error("Error cargando países:", error);
        document.querySelector('#countries').innerHTML = `<option>Error al cargar países</option>`;
    }
}

}
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
          option.value = codigo;
          option.textContent = nombre;
          select.appendChild(option);
      });
  }
}
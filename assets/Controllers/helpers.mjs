export default class Helpers {   

  static fullSelectors(selectId, data, firstOptionText = "ingrese texto") {
      let select = document.querySelector(selectId);
      select.innerHTML = ""; // Limpiar select

      let firstOption = document.createElement("option");
      firstOption.value = "";
      firstOption.textContent = firstOptionText;
      select.appendChild(firstOption);

      // Recorrer el array de países y extraer clave-valor
      data.forEach(country => {
          let [codigo, nombre] = Object.entries(country)[0];
          let option = document.createElement("option");
          option.value = codigo;
          option.textContent = nombre;
          select.appendChild(option);
      });
  }
}


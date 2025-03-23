export default class Helpers {   
/**
   * Crea el HTML correspondiente a una lista de opciones para inyectar en un select
   * IMPORTANTE: recordar que recibe un OBJETO, no parámetros independientes
   * @param {Object} El objeto de definición de la lista
   * @returns El HTML con la lista de opciones
   */
    static toOptionList = ({
        items = [], // el array de objetos para crear la lista
        value = '', // el nombre del atributo de cada objeto que se usará como value
        text = '', // el nombre del atributo de cada objeto que se usará como text
        selected = '', // el valor que debe marcarse como seleccionado
        firstOption = '', // opcionalmente una opción adicional para iniciar la lista
      } = {}) => {
        let options = ''
        if (firstOption) {
          options += `<option value="">${firstOption}</option>`
        }
    
        items.forEach(item => {
          if (item[value] == selected) {
            // comprobación débil adrede
            options += `<option value="${item[value]}" selected>${item[text]}</option>`
          } else {
            options += `<option value="${item[value]}">${item[text]}</option>`
          }
        })
        return options
      }
}
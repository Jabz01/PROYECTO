import User from '../../funciones/user.mjs';
import  Helpers  from './helpers.mjs'

class Regist{
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

document.querySelector("#register").addEventListener("click", async (e) => {
    
    e.preventDefault();

    let newUser = new User();

    newUser.nickname = User.getNick();

    newUser.country = User.getCountry();
})

Regist.loadCountries();
 
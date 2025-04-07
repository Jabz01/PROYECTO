import User from '../../funciones/user.mjs';
import Helpers from './helpers.mjs';

Helpers.loadCountries();

document.querySelector("#register").addEventListener("click", async (e) => {
    e.preventDefault();

    const nicknameInput = document.querySelector("#nickname");
    const countrySelect = document.querySelector("#countries");

    // Validación del nickname
    if (nicknameInput.value.trim() === "") {
        alert("Por favor ingrese un Nickname");
        return;
    }

    // Validación del país
    if (countrySelect.value === "" || countrySelect.value === "Click para Expandir") {
        alert("Por favor seleccione un país");
        return;
    }

    // Crear usuario
    const newUser = new User();
    newUser.nickname = nicknameInput.value.trim();
    newUser.country = countrySelect.value;

    localStorage.setItem("Player",JSON.stringify(newUser));

    window.location.href = "./home.html"

    console.log("Usuario registrado:", newUser);
});




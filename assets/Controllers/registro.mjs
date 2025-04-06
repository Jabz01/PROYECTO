import User from '../../funciones/user.mjs';
import  Helpers  from './helpers.mjs'

Helpers.loadCountries();

document.querySelector("#register").addEventListener("click", async (e) => {
    
    e.preventDefault();

    let newUser = new User();

    newUser.nickname = User.getNick();

    newUser.country = User.getCountry();
})

Regist.loadCountries();
 
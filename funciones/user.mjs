export default class User{
    nickname = "";
    country = "";

    constructor(nick, country) {
        this.nickname = nick;
        this.country = country ;
    }

    get Nickname(){
        return this.nickname
    }

    get Country(){
        return this.country
    }

    static getNick() {
        return document.querySelector('#nickname').value;
    }
    
    static getCountry() {
        return document.querySelector("#countries").value;
    }

    // Setters
    set Nickname(value) {
        if (typeof value === "string") {
            this.nickname = value;
        } else {
            throw new Error("Error al registrar el nick.");
        }
    }

    set Country(value) {
        if (typeof value === "string") {
            this.country = value;
        } else {
            throw new Error("Error al registrar el pais.");
        }
    }
}


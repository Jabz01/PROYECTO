export default class User{
    nickname = "";
    country = "";

    constructor(nick, country) {
        this.nickname = nick;
        this.country = country ;
    }

    get Nickname(){
        return this._nickname
    }

    get Country(){
        return this._country
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
            this._nickname = value;
        } else {
            throw new Error("Error al registrar el nick.");
        }
    }

    set Country(value) {
        if (typeof value === "string") {
            this._country = value;
        } else {
            throw new Error("Error al registrar el pais.");
        }
    }
}


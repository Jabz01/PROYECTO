import { Board, loadBoard } from '../../funciones/board.mjs';
import Vector2 from '../../funciones/vector2.mjs';
import { launchBomb } from "./../../funciones/shoot.mjs"
import { createBoard, launchRandomBomb } from "./../../funciones/bot.mjs"
import { BombState } from '../../funciones/bomb.mjs';
import { exportMapAsJSON } from '../../funciones/map-export.mjs';

let mapSize = 10;

let userMap = null;
let botMap = null;
let won = false;

const turnMessages = [
    "Estoy pensando...",
    "Solo una bomba más",
    "Fire in the hole!",
    "Analizando terreno",
    "Hora de destrozarte",
    "Sopla Monda.txt",
    "LOREM IPSUM 🗿",
    "Metal_Pipe_Sound.wav",
    "Ayer me llamo una niña...",
    "It start with one thing",
    "Vamo al sofa, de Miguel",
    "Mondongo",
    "¿Saben quien me enseño a destruir rusos?, MI MAMIIIIIIIIIIIIIIIIIIIIIII",
    "Miguel... ¿Ese coral acaba de hablar vietnamita?"
]

function getPoints(botBoard) {
    let points = 0;
    for (let bomb of botBoard.launchedBombs) {
        switch (bomb.state) {
            case BombState.FAILED: points -= 1; break;
            case BombState.ADJACENT: points -= 3; break;
            case BombState.FIRE_IN_THE_HOLE: points += 10; break;
            default:
                break;
        }
    }

    return points;
}

async function registerPoints(botBoard) {
    try {
        let points = getPoints(botBoard);
        let player = JSON.parse(localStorage.getItem("Player"));
        
        let response = await fetch("http://127.0.0.1:5000/score-recorder", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "nick_name": player.nickname,
                "score": points,
                "country_code": player.country
            })
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        console.log("Datos enviados al backend:", {
            "nick_name": player.nickname,
            "score": points,
            "country_code": player.country
        });

        // ✅ Recargar el ranking si existe la tabla en esta vista
        if (document.querySelector("#rank")) {
            Ranking.loadRank();
        }

    } catch (error) {
        console.error("Error al registrar los puntos:", error);
    }
}
function effectiveHits(board) {
    let hits = 0;

    board.launchedBombs.forEach(bomb => {
        if (bomb.state == BombState.FIRE_IN_THE_HOLE) {
            hits++;
        }
    });

    return hits;
}

function checkForWin() {
    let userHits = effectiveHits(userMap);
    let botHits = effectiveHits(botMap);

    if (userHits >= 19 || botHits >= 19) {
        document.getElementById("win-overlay").classList.remove("unabled");
        document.getElementById("win-message").innerHTML = (botHits >= 19 ? "¡Ganaste! Severo tryhard" : "El bot ha ganado esta vez, pero... regresamos mañana 🤑") + "\nTienes " + getPoints(botMap) + " puntos";
        botMap.renderOn("botMap", mapSize);
        registerPoints(botMap)
        return true
    }

    return false
}

function takeBotTurn() {
    document.getElementById("overlay").innerHTML = turnMessages[Math.floor(Math.random() * turnMessages.length)];
    document.getElementById("overlay").classList.remove("unabled");

    setTimeout(() => {
        launchRandomBomb(userMap, new Vector2(mapSize, mapSize))

        setTimeout(() => {
            document.getElementById("overlay").classList.add("unabled")
        }, 500);

        if (checkForWin()) {
            return
        }

        renderBoards();
    }, 500)
}

function launchBombAtEnemy(x, y) {
    let bomb = launchBomb(botMap, new Vector2(x, y));

    renderBoards();

    if (checkForWin() || !bomb) {
        return;
    }

    takeBotTurn();
}

function renderBoards() {
    userMap.renderOn("userMap", mapSize);
    botMap.renderOn("botMap", mapSize, launchBombAtEnemy, false);
}

async function loadClimate() {
    try {
        let country = JSON.parse(localStorage.getItem("country"))
        const countryCode = country; 
        const apiKey = "35ce21796a0bc69f80283e127c511bb5";

        const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const data = await res.json();

        const capital = data[0].capital?.[0];
        if (!capital) throw new Error("No se encontró la capital.");

        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital},${countryCode}&appid=${apiKey}&units=metric`);
        const weatherData = await weatherRes.json();

        const temp = weatherData.main.temp;
        const weather = weatherData.weather[0].main;
        const icon = weatherData.weather[0].icon;

        const weatherDiv = document.getElementById("weather");
        weatherDiv.innerHTML = `
            <p class="text-lg font-bold">${capital}</p>
            <p class="text-sm">${weather} - ${temp}°C</p>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${weather}" class="mx-auto">
        `;
    } catch (err) {
        console.error("Error al cargar el clima:", err);
        document.getElementById("weather").innerHTML = `<p class="text-red-500">No se pudo cargar el clima</p>`;
    }
}

function downloadDocument(text, name)
{
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(text);
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", name + ".json");
    dlAnchorElem.click();
}

document.addEventListener("DOMContentLoaded", () => {
    mapSize = JSON.parse(localStorage.getItem("mapSize")).x;
    userMap = loadBoard();
    botMap = createBoard(userMap, new Vector2(mapSize, mapSize));

    renderBoards();
    loadClimate();

    document.querySelector("#ExportButton").addEventListener('click', () =>{
        let exportUser = exportMapAsJSON(userMap,new Vector2(mapSize, mapSize),"p1");
        let exportBot = exportMapAsJSON(botMap,new Vector2(mapSize, mapSize),"p2");
        downloadDocument(exportUser, "userMap");
        downloadDocument(exportBot, "botMap");
    })
})

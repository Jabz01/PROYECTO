class Ranking{
    static async loadRank(){
        try {
            let response = await fetch("http://127.0.0.1:5000/ranking")
    
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            let data = await response.json();

            let table = document.querySelector("#rank");
            data.forEach((user, index) => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${user.nick_name}</td>
                    <td>${user.score}</td>
                    <td><img src="https://flagsapi.com/${user.country_code.toUpperCase()}/shiny/32.png" alt="${user.country_code}"></td>
                `;
                table.appendChild(row);
            });
    
        } catch (error) {
            console.log("Error al cargar los ranks", error)
        }

    }
}


document.addEventListener("DOMContentLoaded", () => {
    Ranking.loadRank();
});
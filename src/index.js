import { populateDropdown } from './modules/dropdown.js';
import "./modules/imports";

document.addEventListener("DOMContentLoaded", function() {
    const cityDropdown = document.querySelector('#cityDropdown');
    
    // Inicializa o Select2 -- jQuery
    // Tem outras formas de fazer, mas essa é a mais facil
    // Não gosto muito de JQuery, mas dada a baixa magnitude do projeto, é aceitável
    $(cityDropdown).select2();

    // Preenche o dropdown
    populateDropdown();
    
    document.getElementById("action").addEventListener("click", function () {
        let climaDiv = document.getElementById("clima");
        climaDiv.innerHTML = "";

        const apiKey = "deb2755f097ab405dce4ed8843c7e2b3";
        const city = cityDropdown.value;

        if (city === "") {
            alert("Please select a city");
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                let iconDiv = document.createElement("div");
                let iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                let climaTipoDiv = document.createElement("div");
                let sensacaoDiv = document.createElement("div");
                let temperaturaDiv = document.createElement("div");
                let humidadeDiv = document.createElement("div");
                let ventoDiv = document.createElement("div");

                iconDiv.innerHTML = `<img src="${iconUrl}" alt="Weather icon" class="icon-div">`;
                climaTipoDiv.innerHTML = `Clima: ${capitalizeFirstLetter(data.weather[0].description)}`;
                sensacaoDiv.innerHTML = `Sensação térmica: ${data.main.feels_like}°C`;
                temperaturaDiv.innerHTML = `Temperatura: ${data.main.temp}°C`;
                humidadeDiv.innerHTML = `Humidade: ${data.main.humidity}%`;
                ventoDiv.innerHTML = `Vento: ${data.wind.speed} m/s`;

                climaDiv.appendChild(iconDiv);
                climaDiv.appendChild(climaTipoDiv);
                climaDiv.appendChild(sensacaoDiv);
                climaDiv.appendChild(temperaturaDiv);
                climaDiv.appendChild(humidadeDiv);
                climaDiv.appendChild(ventoDiv);
            })
            .catch(error => {
                console.error('Erro ao obter dados do clima:', error);
                climaDiv.innerHTML = "Erro ao obter dados do clima";
            });
    });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
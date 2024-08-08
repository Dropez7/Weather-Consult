import {
    populateDropdown
} from './modules/dropdown.js';
import "./modules/imports";

document.addEventListener("DOMContentLoaded", function () {
    const cityDropdown = document.querySelector('#cityDropdown');

    // Inicializa o Select2 -- jQuery
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
                climaDiv.appendChild(TopWeatherExib(data));
                climaDiv.appendChild(bottomWeatherDescription(data));
                climaDiv.appendChild(bottomWeatherDetails(data));
            })
            .catch(error => {
                console.error('Erro ao obter dados do clima:', error);
                climaDiv.innerHTML = "Erro ao obter dados do clima";
            });
    });


});

// Função para deixar a primeira letra da frase maiuscula
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Função para adicionar a parte de cima da exibição do clima
function TopWeatherExib(data) {
    let divRow = document.createElement("div");
    divRow.classList.add("row", "align-items-center");

    let divColTemp = document.createElement("div");
    divColTemp.classList.add("col-md-6", "temp-col");
    divColTemp.innerHTML = `${data.main.temp}°C`;

    let divColIcon = document.createElement("div");
    divColIcon.classList.add("col-md-6", "text-center");
    let imgIcon = document.createElement("img");
    imgIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    imgIcon.alt = "Weather icon";
    imgIcon.classList.add("icon-div");

    divColIcon.appendChild(imgIcon);
    divRow.appendChild(divColTemp);
    divRow.appendChild(divColIcon);

    return divRow;
}

// Função para adicionar a descrição do clima
function bottomWeatherDescription(data) {
    let divRowDescription = document.createElement("div");
    divRowDescription.classList.add("row");

    let divColDescription = document.createElement("div");
    divColDescription.classList.add("col-md-12", "desc-col");
    divColDescription.innerHTML = `Clima: ${capitalizeFirstLetter(data.weather[0].description)}`;

    divRowDescription.appendChild(divColDescription);
    return divRowDescription;
}

// Função para adicionar os detalhes do clima
function bottomWeatherDetails(data) {
    let divRow = document.createElement("div");
    divRow.classList.add("row");

    let divColDetails = document.createElement("div");
    divColDetails.classList.add("col-md-12", "details-col");

    divColDetails.innerHTML = `Sensação térmica: ${data.main.feels_like}°C<br>
                               Humidade: ${data.main.humidity}%<br>
                               Vento: ${data.wind.speed} m/s`;

    divRow.appendChild(divColDetails);
    return divRow;
}
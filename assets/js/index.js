document.getElementById("action").addEventListener("click", function () {
    let climaDiv = document.getElementById("clima");

    // Limpar conteúdo anterior
    climaDiv.innerHTML = "";

    const apiKey = "deb2755f097ab405dce4ed8843c7e2b3";
    const city = document.getElementById("cityDropdown").value;
    if (city === "") {
        alert("Please select a city");
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            let iconDiv = document.createElement("div");
            let iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            iconDiv.innerHTML = `<img src="${iconUrl}" alt="Weather icon">`;

            let sensacaoDiv = document.createElement("div");
            let temperaturaDiv = document.createElement("div");
            let humidadeDiv = document.createElement("div");
            let ventoDiv = document.createElement("div");

            sensacaoDiv.innerHTML = `Sensação térmica: ${data.main.feels_like}°C`;
            temperaturaDiv.innerHTML = `Temperatura: ${data.main.temp}°C`;
            humidadeDiv.innerHTML = `Humidade: ${data.main.humidity}%`;
            ventoDiv.innerHTML = `Vento: ${data.wind.speed} m/s`;

            climaDiv.appendChild(iconDiv);
            climaDiv.appendChild(sensacaoDiv);
            climaDiv.appendChild(temperaturaDiv);
            climaDiv.appendChild(humidadeDiv);
            climaDiv.appendChild(ventoDiv);

        }).catch(error => {
            console.error('Erro ao obter dados do clima:', error);
            climaDiv.innerHTML = "Erro ao obter dados do clima";
        });
});


/* 
{
    "coord": {
        "lon": -46.6361,
        "lat": -23.5475
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 27.83,
        "feels_like": 27.17,
        "temp_min": 27.47,
        "temp_max": 28.2,
        "pressure": 1012,
        "humidity": 34,
        "sea_level": 1012,
        "grnd_level": 924
    },
    "visibility": 10000,
    "wind": {
        "speed": 6.17,
        "deg": 330
    },
    "clouds": {
        "all": 0
    },
    "dt": 1723133306,
    "sys": {
        "type": 2,
        "id": 2033898,
        "country": "BR",
        "sunrise": 1723109823,
        "sunset": 1723150037
    },
    "timezone": -10800,
    "id": 3448439,
    "name": "São Paulo",
    "cod": 200
}
    */
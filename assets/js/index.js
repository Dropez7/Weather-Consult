

document.getElementById("action").addEventListener("click", function() { 

    const apiKey = "deb2755f097ab405dce4ed8843c7e2b3"
    const city = document.getElementById("cityDropdown").value;
    if (city === "") {
        alert("Please select a city");
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
});
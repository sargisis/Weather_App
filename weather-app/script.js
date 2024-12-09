const apiKey = "716aa27058963431d3f2aafaeff2e033";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchLocation(location);
    }
    else 
    {
        alert("Please Enter your city");
    }
});

locationInput.addEventListener('keydown' , (event) => {
    if (event.key === 'Enter')
    {
        const location = locationInput.value;
        if (location)
        {
            fetchLocation(location);
        }
        else 
        {
            alert("Please Enter your city");
        }
    }
});

function fetchLocation(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`

            const iconCode = data.weather[0].icon; 
            const weatherIcon = document.getElementById('weatherIcon');
           
            weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            weatherIcon.alt = data.weather[0].description;
            weatherIcon.style.display = 'block';
            
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            locationElement.textContent = "There is no such city, sorry.";
            temperatureElement.textContent = "";
            descriptionElement.textContent = "";
            humidityElement.textContent = "";
            const weatherIcon = document.getElementById('weatherIcon');
            weatherIcon.style.display = 'none';
        });
}

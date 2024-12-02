const apiKey = "b8ea99cfe288ed653f57d692c02d0739"; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    displayError("Please enter a city name.");
  }
});

function fetchWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found.");
      }
      return response.json();
    })
    .then((data) => displayWeather(data))
    .catch((error) => displayError(error.message));
}

function displayWeather(data) {
  const { name, main, weather } = data;
  const weatherHTML = `
    <h2>${name}</h2>
    <p>${weather[0].description.toUpperCase()}</p>
    <p>Temperature: ${main.temp}°C</p>
    <p>Humidity: ${main.humidity}%</p>
  `;
  weatherResult.innerHTML = weatherHTML;
  weatherResult.style.color = "white";
}

function displayError(message) {
  weatherResult.innerHTML = `<p>${message}</p>`;
  weatherResult.style.color = "red";
}

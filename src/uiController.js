import { updateBackgroundImage } from './imageController.js';
import { fahrenheitFromCelsius } from './weatherData.js';

export function displayWeatherInfo(data) {
    const weatherInfoContainer = document.getElementById('weather-info-container');
    const weatherInfo = document.getElementById('weather-info');
    const unit = document.querySelector('input[name="unit"]:checked').value;
    const temperature = unit === 'fahrenheit' ? fahrenheitFromCelsius(data.temperature) : data.temperature;
    const unitSymbol = unit === 'fahrenheit' ? '°F' : '°C';

    weatherInfo.innerHTML = `
        <h2>${data.location}</h2>
        <p id="temperature">Temperature: ${temperature.toFixed(1)}${unitSymbol}</p>
        <p>Condition: ${data.condition}</p>
        <p>Humidity: ${data.humidity}%</p>
        <p>Wind Speed: ${data.windSpeed} km/h</p>
    `;

    weatherInfoContainer.classList.remove('hidden');
    weatherInfoContainer.classList.add('visible');

    updateBackgroundImage(data.condition);
}

export function hideWeatherInfo() {
    const weatherInfoContainer = document.getElementById('weather-info-container');
    weatherInfoContainer.classList.remove('visible');
    weatherInfoContainer.classList.add('hidden');
}
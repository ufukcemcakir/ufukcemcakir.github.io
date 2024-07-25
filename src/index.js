import { getWeatherData } from './weatherData.js';
import { displayWeatherInfo, hideWeatherInfo } from './uiController.js';
import { createFooter } from './footer.js';

let currentWeatherData = null;

const weatherForm = document.getElementById('weather-form');
const locationInput = document.getElementById('location');
const loading = document.getElementById('loading');
const unitSelector = document.getElementById('unit-selector');

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = locationInput.value;
    
    loading.classList.remove('hidden');
    hideWeatherInfo();

    try {
        currentWeatherData = await getWeatherData(location);
        displayWeatherInfo(currentWeatherData);
    } catch (error) {
        document.getElementById('weather-info').innerHTML = `<p>Error: ${error.message}</p>`;
        document.getElementById('weather-info-container').classList.add('visible');
    } finally {
        loading.classList.add('hidden');
    }
});

unitSelector.addEventListener('change', () => {
    if (currentWeatherData) {
        displayWeatherInfo(currentWeatherData);
    }
});

document.body.appendChild(createFooter());
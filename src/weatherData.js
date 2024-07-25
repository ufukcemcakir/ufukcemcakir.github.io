import { API_KEY, BASE_URL } from './api.js';

export async function getWeatherData(location) {
    const url = `${BASE_URL}${location}?unitGroup=metric&key=${API_KEY}&contentType=json`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        return processWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

function processWeatherData(data) {
    const currentConditions = data.currentConditions;
    return {
        location: data.resolvedAddress,
        temperature: currentConditions.temp,
        condition: currentConditions.conditions,
        icon: currentConditions.icon,
        humidity: currentConditions.humidity,
        windSpeed: currentConditions.windspeed
    };
}

export function fahrenheitFromCelsius(celsius) {
    return (celsius * 9/5) + 32;
}

export function celsiusFromFahrenheit(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}
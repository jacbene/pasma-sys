// OpenWeatherMap API Configuration
const API_KEY = '6b5ab64fe9af25a6627b2ec650b5bcac'; // Get from https://openweathermap.org/api
const BASE_URL = 'https://api.openweathermap.org';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const currentWeatherContent = document.getElementById('currentWeatherContent');
const forecastContent = document.getElementById('forecastContent');
const detailsContent = document.getElementById('detailsContent');
const hourlyContent = document.getElementById('hourlyContent');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

// Load weather for default city on page load
window.addEventListener('load', () => {
    fetchWeather('London');
});

/**
 * Handle search functionality
 */
function handleSearch() {
    const city = searchInput.value.trim();
    if (city) {
        fetchWeather(city);
        searchInput.value = '';
    }
}

/**
 * Fetch weather data from API
 */
async function fetchWeather(city) {
    try {
        showLoading(true);
        hideError();

        // Fetch current weather
        const currentResponse = await fetch(
            `${BASE_URL}/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!currentResponse.ok) {
            throw new Error('City not found');
        }

        const currentData = await currentResponse.json();

        // Fetch forecast data
        const forecastResponse = await fetch(
            `${BASE_URL}/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );

        const forecastData = await forecastResponse.json();

        // Display weather data
        displayCurrentWeather(currentData);
        displayForecast(forecastData);
        displayDetails(currentData);
        displayHourlyForecast(forecastData);

        showLoading(false);
    } catch (error) {
        showError(error.message);
        showLoading(false);
    }
}

/**
 * Display current weather
 */
function displayCurrentWeather(data) {
    const { name, sys, main, weather, wind } = data;
    const icon = getWeatherIcon(weather[0].main);

    currentWeatherContent.innerHTML = `
        <div class="location">${name}, ${sys.country}</div>
        <div class="weather-icon">${icon}</div>
        <div class="temperature">${Math.round(main.temp)}°C</div>
        <div class="description">${weather[0].description}</div>
        <div style="margin-top: 15px; font-size: 0.95rem; color: var(--text);">
            <div>Feels like: <strong>${Math.round(main.feels_like)}°C</strong></div>
            <div>Wind: <strong>${Math.round(wind.speed)} m/s</strong></div>
        </div>
    `;
}

/**
 * Display 5-day forecast
 */
function displayForecast(data) {
    const forecasts = data.list.filter((item, index) => index % 8 === 0); // Every 24 hours
    
    forecastContent.innerHTML = forecasts.map(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const icon = getWeatherIcon(forecast.weather[0].main);

        return `
            <div class="forecast-item">
                <div class="day">${day}</div>
                <div class="icon">${icon}</div>
                <div class="temp">${Math.round(forecast.main.temp)}°C</div>
                <div class="min-max">
                    ${Math.round(forecast.main.temp_min)}° / ${Math.round(forecast.main.temp_max)}°
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Display weather details
 */
function displayDetails(data) {
    const { main, wind, clouds, sys } = data;
    const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    const sunset = new Date(sys.sunset * 1000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    detailsContent.innerHTML = `
        <div class="detail-item">
            <div class="detail-label">💧 Humidity</div>
            <div class="detail-value">${main.humidity}%</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">🌪️ Wind Speed</div>
            <div class="detail-value">${Math.round(wind.speed)} m/s</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">🌫️ Pressure</div>
            <div class="detail-value">${main.pressure} hPa</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">👁️ Visibility</div>
            <div class="detail-value">${(data.visibility / 1000).toFixed(1)} km</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">☁️ Cloudiness</div>
            <div class="detail-value">${clouds.all}%</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">🌅 Sunrise</div>
            <div class="detail-value" style="font-size: 1rem;">${sunrise}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">🌇 Sunset</div>
            <div class="detail-value" style="font-size: 1rem;">${sunset}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">🌡️ Feels Like</div>
            <div class="detail-value">${Math.round(main.feels_like)}°C</div>
        </div>
    `;
}

/**
 * Display hourly forecast
 */
function displayHourlyForecast(data) {
    const hourlyData = data.list.slice(0, 12); // Next 12 hours

    hourlyContent.innerHTML = hourlyData.map(hour => {
        const date = new Date(hour.dt * 1000);
        const time = date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false
        });
        const icon = getWeatherIcon(hour.weather[0].main);

        return `
            <div class="hourly-item">
                <div class="time">${time}</div>
                <div class="icon">${icon}</div>
                <div class="temp">${Math.round(hour.main.temp)}°C</div>
            </div>
        `;
    }).join('');
}

/**
 * Get weather emoji icon based on weather condition
 */
function getWeatherIcon(condition) {
    const icons = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Drizzle': '🌦️',
        'Rain': '🌧️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Smoke': '💨',
        'Haze': '🌫️',
        'Dust': '🌪️',
        'Fog': '🌫️',
        'Sand': '🌪️',
        'Ash': '💨',
        'Squall': '🌪️',
        'Tornado': '🌪️'
    };
    return icons[condition] || '🌤️';
}

/**
 * Show loading spinner
 */
function showLoading(show) {
    loadingDiv.classList.toggle('hidden', !show);
}

/**
 * Show error message
 */
function showError(message) {
    errorDiv.textContent = `❌ Error: ${message}`;
    errorDiv.classList.remove('hidden');
}

/**
 * Hide error message
 */
function hideError() {
    errorDiv.classList.add('hidden');
}

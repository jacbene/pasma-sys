# 🌤️ Weather Dashboard

A beautiful, responsive weather dashboard that fetches real-time weather data from the OpenWeatherMap API.

## Features

✨ **Key Features:**
- 🔍 Search weather by city name
- 🌡️ Real-time current weather conditions
- 📅 5-day weather forecast
- 📊 Detailed weather metrics (humidity, wind speed, pressure, visibility)
- ⏰ Hourly forecast for the next 12 hours
- 📱 Fully responsive design for mobile and desktop
- 🎨 Modern UI with smooth animations
- 🌙 Dark gradient background with card-based layout

## Weather Information Displayed

### Current Weather
- City and country
- Current temperature
- Weather condition description
- "Feels like" temperature
- Wind speed

### Weather Details
- Humidity percentage
- Wind speed (m/s)
- Atmospheric pressure
- Visibility distance
- Cloud coverage
- Sunrise and sunset times
- Feels like temperature

### Forecasts
- **5-Day Forecast**: Daily high/low temperatures with weather icons
- **Hourly Forecast**: Temperature for the next 12 hours

## Setup Instructions

### 1. Get API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate a free API key from your account dashboard

### 2. Configure API Key

Open `script.js` and replace `'YOUR_API_KEY_HERE'` with your actual API key:

```javascript
const API_KEY = 'your_actual_api_key_here';
```

### 3. Run the Application

Simply open `index.html` in your web browser or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server installed globally)
http-server
```

Then navigate to `http://localhost:8000` in your browser.

## Usage

1. **Search for a City**: Type a city name in the search box and press Enter or click the Search button
2. **View Current Weather**: See current conditions and detailed metrics
3. **Check Forecast**: Browse the 5-day forecast and hourly predictions
4. **Default City**: London weather loads automatically on first visit

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with gradients, flexbox, and grid
- **JavaScript (ES6+)**: Async/await, DOM manipulation, API calls
- **OpenWeatherMap API**: Real-time weather data

## API Endpoints Used

1. **Current Weather**: `GET /data/2.5/weather`
2. **5-Day Forecast**: `GET /data/2.5/forecast`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Error Handling

- Invalid city names display user-friendly error messages
- Network errors are caught and displayed
- Loading states prevent multiple simultaneous requests

## Customization

### Change Default City
Edit the `window.addEventListener('load')` in `script.js`:

```javascript
window.addEventListener('load', () => {
    fetchWeather('New York'); // Change to your preferred city
});
```

### Modify Temperature Units
Change `units=metric` to `units=imperial` in the API calls for Fahrenheit.

### Customize Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --primary: #3498db;
    --secondary: #2c3e50;
    /* ... more variables ... */
}
```

## Future Enhancements

- 📍 Geolocation-based weather
- ⭐ Favorite cities/bookmarks
- 📊 Weather history and trends
- 🌍 Multiple language support
- 🔔 Weather alerts and notifications
- 📲 Progressive Web App (PWA) support
- 🗂️ Local storage for recent searches

## Troubleshooting

### "City not found" Error
- Ensure the city name is spelled correctly
- Try using different city names (some cities have multiple spellings)

### No weather data displaying
- Verify your API key is correct in `script.js`
- Check that you have internet connectivity
- Ensure your API key is activated (check OpenWeatherMap dashboard)

### Styling issues
- Clear your browser cache (Ctrl+Shift+Del or Cmd+Shift+Del)
- Try a different browser

## License

Free to use and modify for personal and educational purposes.

## Credits

- Weather data: [OpenWeatherMap](https://openweathermap.org/)
- Icons: Emoji weather icons

## Support

For issues or questions, please open an issue in the repository.

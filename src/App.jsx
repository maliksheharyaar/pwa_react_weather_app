import React, {useState, Suspense} from "react";
import { fetchForcast, fetchWeather } from "./api/fetchWeather";
import SearchInput from "./components/SearchInput.jsx";
import Earth from "./components/3d/Earth.jsx";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import './App.css';

const App = () => {
    const [weather, setWeather] = useState({});
    const [forcast, setForcast] = useState({});
    const [error, setError] = useState('');
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const d = new Date();

    const search = async (queryOrSuggestion) => {
        try {
            setError('');
            let weatherData;
            let warning = '';
            let expectedName, expectedCountry;

            if (typeof queryOrSuggestion === 'object' && queryOrSuggestion.lat && queryOrSuggestion.lon) {
                expectedName = queryOrSuggestion.name?.toLowerCase();
                expectedCountry = queryOrSuggestion.country?.toLowerCase();
                weatherData = await fetchWeather(queryOrSuggestion.name, queryOrSuggestion.lat, queryOrSuggestion.lon, queryOrSuggestion.country);
            } else if (typeof queryOrSuggestion === 'string' && queryOrSuggestion.includes(',')) {
                const [city, country] = queryOrSuggestion.split(',').map(s => s.trim());
                expectedName = city?.toLowerCase();
                expectedCountry = country?.toLowerCase();
                weatherData = await fetchWeather(city, undefined, undefined, country);
            } else {
                weatherData = await fetchWeather(queryOrSuggestion);
            }

            // Add a warning if the returned city/country does not match the selection
            if (expectedName && expectedCountry) {
                const returnedName = weatherData.name?.toLowerCase();
                const returnedCountry = weatherData.sys?.country?.toLowerCase();
                if (returnedName !== expectedName || returnedCountry !== expectedCountry) {
                    warning = `Warning: Returned city (${weatherData.name}, ${weatherData.sys.country}) does not match your selection (${expectedName}, ${expectedCountry}).`;
                }
            }

            setWeather(weatherData);
            if (warning) setError(warning);
            else setError('');

            const forcastData = await fetchForcast(weatherData.coord.lat, weatherData.coord.lon);
            setForcast(forcastData);
        } catch (err) {
            setError(err.message || 'Failed to fetch weather data');
            console.error('Error fetching weather:', err);
        }
    }

    // Helper function to get daily forecast
    const getDailyForecast = (index) => {
        if (!forcast.list) return null;
        const dayForecasts = forcast.list.slice(index * 8, (index + 1) * 8);
        if (dayForecasts.length === 0) return null;
        const avgTemp = dayForecasts.reduce((acc, curr) => acc + curr.main.temp, 0) / dayForecasts.length;
        const weatherCount = {};
        dayForecasts.forEach(forecast => {
            const weather = forecast.weather[0].main;
            weatherCount[weather] = (weatherCount[weather] || 0) + 1;
        });
        const mostCommonWeather = Object.entries(weatherCount)
            .sort((a, b) => b[1] - a[1])[0][0];
        const weatherIcon = dayForecasts.find(f => f.weather[0].main === mostCommonWeather).weather[0].icon;
        return {
            temp: avgTemp,
            weather: mostCommonWeather,
            icon: weatherIcon
        };
    };

    return (
        <div className={`main-container${weather.main ? ' with-forecast' : ''}`}>
            <h1 className="title">PWA Weather Application</h1>
            <SearchInput onSearch={search} />
            {error && <div className="error-message">{error}</div>}
            {weather.main && (
                <div className="content-columns">
                    <div className="left-column">
                        <div className="city">
                            <h2 className="city-name">
                                <span>{weather.name}</span>
                                <sup>{weather.sys.country}</sup>
                            </h2>
                            <div className="city-temp">
                                {Math.round(weather.main.temp)}
                                <sup>&deg;C</sup>
                            </div>
                            <div className="info">
                                <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                                <p>{weather.weather[0].description}</p>
                            </div>
                            <hr></hr>
                            {forcast.list && (
                                <div className="forcast-grid">
                                    {[0, 1, 2, 3].map((dayIndex) => {
                                        const dayForecast = getDailyForecast(dayIndex);
                                        if (!dayForecast) return null;
                                        return (
                                            <div key={dayIndex} className="forcast-row">
                                                <h1 className="city-name">
                                                    <span>{weekday[(d.getDay() + dayIndex + 1) % 7]}</span>
                                                </h1>
                                                <div className="day-night-temp-forcast">
                                                    <div className="forcast-temp">
                                                        {Math.round(dayForecast.temp)}
                                                        <sup>&deg;C</sup>
                                                    </div>
                                                </div>
                                                <div className="info">
                                                    <img className="forcast-city-icon" src={`https://openweathermap.org/img/wn/${dayForecast.icon}@2x.png`} alt={dayForecast.weather} />
                                                    <p>{dayForecast.weather}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="right-column">
                        <Canvas style={{ height: 500, width: 500, background: 'black' }} camera={{ position: [0, 0, 1.8] }}>
                            <Stars radius={300} depth={60} count={10000} factor={8} saturation={0} fade />
                            <ambientLight intensity={0.7} />
                            <directionalLight position={[5, 5, 5]} intensity={1} />
                            <Suspense fallback={null}>
                                <Earth scale={[0.01,0.01,0.01]} lat={weather.coord.lat} lon={weather.coord.lon} />
                            </Suspense>
                            <OrbitControls enableZoom={false} />
                        </Canvas>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App; 

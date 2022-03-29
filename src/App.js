import React, {useState} from "react";
import { fetchForcast, fetchWeather } from "./api/fetchWeather";
import './App.css';

const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [forcast, setForcast] = useState({});
    const weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const d = new Date();

    const search = async (event) => {
        if(event.key === 'Enter'){
            const weatherData = await fetchWeather(query);
            
            setWeather(weatherData); //Assign data to weather variable 
            setQuery(''); //Reset query
           

            const forcastData = await fetchForcast(weatherData.coord.lat, weatherData.coord.lon);
            setForcast(forcastData); //Assign forcastData to forcast variable
            
            
            
        }
    }

    return(
        <div className="main-container">
            <h1 className="title"> PWA Weather Application</h1>
            <input 
                type="text"
                className="search"
                placeholder="Search..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyPress={search}
                />
           
            {forcast.current && ( //If weather exists, return the component or else return nothing
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        { <sup>{weather.sys.country}</sup> /*HTML notation for superscript */}
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>

                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
                        <p>{weather.weather[0].description}</p>
                    </div>




                    <div className="forcast-grid">
                        <div className="forcast-row">
                            <h1 className="city-name">
                                <span>{weekday[d.getDay()] + 1 === 7 ? weekday[0] : weekday[d.getDay()]}</span>
                            </h1>

                            <div className="day-night-temp-forcast">
                                <div className="forcast-temp">
                                    {Math.round(forcast.daily[0].temp.day)}
                                    <sup>&deg;C</sup>
                                </div>
                                <div className="forcast-temp">
                                    {Math.round(forcast.daily[0].temp.night)}
                                    <sup>&deg;C</sup>
                                </div>
                            </div>

                            <div className="info">
                                <img className="forcast-city-icon" src={`https://openweathermap.org/img/wn/${forcast.daily[0].weather[0].icon}@2x.png`} alt={forcast.daily[0].weather[0].description} />
                                <p>{forcast.daily[0].weather[0].description}</p>
                            </div>
                        </div>

                        <div className="forcast-row">
                            <h1 className="city-name">
                                <span>{weekday[d.getDay()] + 2 === 7 ? weekday[0] : weekday[d.getDay() + 1]}</span>
                            </h1>

                            <div className="day-night-temp-forcast">
                                <div className="forcast-temp">
                                    {Math.round(forcast.daily[1].temp.day)}
                                    <sup>&deg;C</sup>
                                </div>
                                <div className="forcast-temp">
                                    {Math.round(forcast.daily[1].temp.night)}
                                    <sup>&deg;C</sup>
                                </div>
                            </div>

                            <div className="info">
                                <img className="forcast-city-icon" src={`https://openweathermap.org/img/wn/${forcast.daily[1].weather[0].icon}@2x.png`} alt={forcast.daily[1].weather[0].description} />
                                <p>{forcast.daily[1].weather[0].description}</p>
                            </div>
                        </div>

                        <div className="forcast-row">
                        <h1 className="city-name">
                                <span>{weekday[d.getDay()] + 3 === 7 ? weekday[0] : weekday[d.getDay() + 2]}</span>
                            </h1>

                            <div className="day-night-temp-forcast">
                                <div className="forcast-temp">
                                    {Math.round(forcast.daily[2].temp.day)}
                                    <sup>&deg;C</sup>
                                </div>
                                <div className="forcast-temp">
                                    {Math.round(forcast.daily[2].temp.night)}
                                    <sup>&deg;C</sup>
                                </div>
                            </div>

                            <div className="info">
                                <img className="forcast-city-icon" src={`https://openweathermap.org/img/wn/${forcast.daily[2].weather[0].icon}@2x.png`} alt={forcast.daily[2].weather[0].description} />
                                <p>{forcast.daily[2].weather[0].description}</p>
                            </div>
                        </div>

                        <div className="forcast-row">
                        <h1 className="city-name">
                                <span>{weekday[d.getDay()] + 4 === 7 ? weekday[0] : weekday[d.getDay() + 3]}</span>
                            </h1>

                            <div className="day-night-temp-forcast">
                                <div className="forcast-temp">
                                    {Math.round(forcast.daily[3].temp.day)}
                                    <sup>&deg;C</sup>
                                </div>
                                <div className="forcast-temp">
                                    {Math.round(forcast.daily[3].temp.night)}
                                    <sup>&deg;C</sup>
                                </div>
                            </div>

                            <div className="info">
                                <img className="forcast-city-icon" src={`https://openweathermap.org/img/wn/${forcast.daily[3].weather[0].icon}@2x.png`} alt={forcast.daily[3].weather[0].description} />
                                <p>{forcast.daily[3].weather[0].description}</p>
                            </div>
                        </div>
                    </div>

                    

                </div>
            )}
           
        </div>
    );
}

export default App;
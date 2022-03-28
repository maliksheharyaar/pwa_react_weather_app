import React, {useState} from "react";
import { fetchWeather } from "./api/fetchWeather";
import './App.css';

const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = async (event) => {
        if(event.key === 'Enter'){
            const data = await fetchWeather(query)
            
            setWeather(data); //Assign data to weather variable 
            setQuery(''); //Reset the query
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

            {weather.main && ( //If weather exists, return the component or else return nothing
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

                </div>
            )}
           
        </div>
    );
}

export default App;
import axios from "axios";


const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORCAST_URL = 'https://api.openweathermap.org/data/2.5/onecall';
const API_KEY = '0c9e2d492390de2df163240753df5365';

export const fetchWeather = async (query) => {
    const {data} = await axios.get(WEATHER_URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
        }
    });

    return data;
}

export const fetchForcast = async (forcastlat, forcastlon) => {
    
    const {data} = await axios.get(FORCAST_URL, {
        params: {
            lat: forcastlat,
            lon: forcastlon,
            exclude: 'minutely,alerts',
            units: 'metric',
            APPID: API_KEY,
        }
    });

    return data;
}
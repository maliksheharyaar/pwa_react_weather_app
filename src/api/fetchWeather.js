import axios from "axios";

const WEATHER_URL=process.env.REACT_APP_WEATHER_URL;
const FORCAST_URL=process.env.REACT_APP_FORCAST_URL;
const API_KEY=process.env.REACT_APP_API_KEY;

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
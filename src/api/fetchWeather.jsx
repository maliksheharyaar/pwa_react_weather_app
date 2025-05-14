import axios from "axios";

const WEATHER_URL="https://api.openweathermap.org/data/2.5/weather";
const FORCAST_URL="https://api.openweathermap.org/data/2.5/forecast";
const GEO_URL="https://api.openweathermap.org/geo/1.0/direct";
const API_KEY=import.meta.env.VITE_API_KEY;

export const fetchCitySuggestions = async (query) => {
    if (!query) return [];
    
    const {data} = await axios.get(GEO_URL, {
        params: {
            q: query,
            limit: 5,
            appid: API_KEY
        }
    });

    return data.map(city => ({
        name: city.name,
        country: city.country,
        state: city.state,
        lat: city.lat,
        lon: city.lon
    }));
};

export const fetchWeather = async (query, lat, lon, country) => {
    let coords = { lat, lon };
    if (lat === undefined || lon === undefined) {
        // If country is provided, use "city,country" for the query
        const geoQuery = country ? `${query},${country}` : query;
        const geoResponse = await axios.get(GEO_URL, {
            params: {
                q: geoQuery,
                limit: 1,
                appid: API_KEY
            }
        });

        if (!geoResponse.data || geoResponse.data.length === 0) {
            throw new Error('City not found');
        }

        coords = geoResponse.data[0];
    }

    // Then get weather using coordinates
    const { data } = await axios.get(WEATHER_URL, {
        params: {
            lat: coords.lat,
            lon: coords.lon,
            units: 'metric',
            appid: API_KEY,
        }
    });

    return data;
}

export const fetchForcast = async (forcastlat, forcastlon) => {
    const {data} = await axios.get(FORCAST_URL, {
        params: {
            lat: forcastlat,
            lon: forcastlon,
            units: 'metric',
            appid: API_KEY,
        }
    });

    return data;
}
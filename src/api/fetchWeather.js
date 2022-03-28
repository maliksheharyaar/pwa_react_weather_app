import axios from "axios";


const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '0c9e2d492390de2df163240753df5365';

export const fetchWeather = async (query) => {
    const {data} = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
        }
    });

    return data;
}
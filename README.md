# PWA Weather Application

A modern Progressive Web App (PWA) weather dashboard built with React, Vite, and Three.js.
## Demo https://maliksheharyaar.github.io/pwa_react_weather_app/

## Features
- Search for weather by city name or city,country code (e.g., "windsor,ca")
- Autocomplete city suggestions with country and state
- Accurate weather and 4-day forecast using OpenWeatherMap API
- 3D interactive Earth with:
  - Realistic texture
  - Animated starfield space background
  - Animated spinning globe
  - Marker and floating arrow for searched location
- Responsive, mobile-friendly UI
- Warning if the returned city does not match the selected city
- No zooming (fixed camera distance)
- PWA compliant with offline support and installable as a web app

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Add your OpenWeatherMap API key:**
   - Create a `.env` file in the `my-app` directory:
     ```
     VITE_API_KEY=your_openweathermap_api_key
     ```
3. **Run the app:**
   ```bash
   npm run dev
   ```
4. **Open in your browser:**
   - Visit [http://localhost:5173](http://localhost:5173)

## Credits
- 3D Earth model by Akshat ([Sketchfab](https://sketchfab.com/shooter24994)), CC-BY-4.0
- Weather data from [OpenWeatherMap](https://openweathermap.org/)
- Built with [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/), and [@react-three/drei](https://docs.pmnd.rs/drei)

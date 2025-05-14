import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/pwa_react_weather_app/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'masked-icon.svg',
        'images/logo.png',
        'images/icon-192x192.png',
        'images/icon-512x512.png'
      ],
      manifest: {
        name: 'PWA Weather Application',
        short_name: 'Weather App',
        description: 'A modern Progressive Web App (PWA) weather dashboard built with React, Vite, and Three.js.',
        theme_color: '#1e2432',
        icons: [
          { src: 'images/icon-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'images/icon-384x384.png', sizes: '384x384', type: 'image/png' },
          { src: 'images/icon-256x256.png', sizes: '256x256', type: 'image/png' },
          { src: 'images/icon-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'images/icon-152x152.png', sizes: '152x152', type: 'image/png' },
          { src: 'images/icon-144x144.png', sizes: '144x144', type: 'image/png' },
          { src: 'images/icon-128x128.png', sizes: '128x128', type: 'image/png' },
          { src: 'images/icon-96x96.png', sizes: '96x96', type: 'image/png' },
          { src: 'images/icon-72x72.png', sizes: '72x72', type: 'image/png' },
          { src: 'images/icon-48x48.png', sizes: '48x48', type: 'image/png' }
        ]
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
})

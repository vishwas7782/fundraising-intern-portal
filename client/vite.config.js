// client/vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- Import the plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- Add the plugin
  ],
  // This is the Vite equivalent of the "proxy" in create-react-app
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001', // Your backend server address
        changeOrigin: true,
        secure: false,      
      }
    }
  }
})
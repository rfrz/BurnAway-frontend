import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    watch: {
      usePolling: true,
      interval: 300,
    },
    proxy: {
      '/api': {
        target: '/api',
        changeOrigin: true,
      }
    }
  },
  base: '/BurnAway-frontend/'
})
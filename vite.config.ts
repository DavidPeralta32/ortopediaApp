import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true })
  ],
  base: '/ortopediaApp/',
  server: {
    allowedHosts: ['.ngrok-free.app'],
    port: 4000
  }
})

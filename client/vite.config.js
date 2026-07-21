import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api/resume': 'http://localhost:4001',
      '/api/track': 'http://localhost:4002',
      '/api/analytics': 'http://localhost:4002',
      '/api/heartbeat': 'http://localhost:4002',
    }
  }
})
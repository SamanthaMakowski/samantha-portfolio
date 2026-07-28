import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['samantha-portfolio-pdg5.onrender.com', 'samanthamakowski.dev', 'www.samanthamakowski.dev'],
    port: 10000,
    host: '0.0.0.0',
  },
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
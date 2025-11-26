import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Importante para que funcione con Electron
  server: {
    port: 3000,
    open: !process.env.ELECTRON // No abrir navegador en modo Electron
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  optimizeDeps: {
    include: ['react-hot-toast']
  },
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  build: {
    outDir: 'dist'
  },
  publicDir: 'Login page',
  server: {
    fs: {
      allow: ['.']
    }
  }
}) 
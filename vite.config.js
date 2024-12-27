import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cours-informatique/', // Doit correspondre au nom de votre repository
  build: {
    outDir: 'dist'
  }
})

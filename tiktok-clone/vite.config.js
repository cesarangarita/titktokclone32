import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser', // Usar terser en lugar de esbuild
    // O deshabilitar completamente la minificación CSS
    cssMinify: false
  }
})


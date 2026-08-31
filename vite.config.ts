import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss() 
  ],
  define: {
    'process.env': {}
  },
  test: {
    globals: true, // Allows you to use describe, it, expect without importing them every time
    environment: 'jsdom', // Simulates a browser HTML DOM
    setupFiles: './src/setupTests.ts', // Runs this file before every test
    css: true, // Parses CSS so elements aren't accidentally hidden in tests
  },
})
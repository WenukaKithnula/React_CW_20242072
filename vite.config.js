import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   test: {
    globals: true,           // use global `describe`, `it`, `expect`
    environment: 'happy-dom', // simulate browser DOM
    setupFiles: './src/setupTests.js', // optional setup file
  },
})

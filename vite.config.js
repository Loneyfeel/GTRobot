import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), compression({
    minify: true,
    brotliOptions: {
      level: 11,
    },
    include: ['**/*.css', '**/*.js'],
    exclude: ['node_modules/**'],
  }),],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
})

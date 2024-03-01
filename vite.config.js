import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { compression } from "vite-plugin-compression2";
import svgr from "vite-plugin-svgr";
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  plugins: [
    react(),
    [svgr()],
    compression({
      minify: true,
      brotliOptions: {
        level: 11,
      },
      include: ["**/*.css", "**/*.js"],
      exclude: ["node_modules/**"],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
});

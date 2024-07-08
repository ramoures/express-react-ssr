import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment'

export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin(['APP_DIRECTORY_NAME', 'WEB_STATIC_TITLE', 'API_BASE_URL', 'SERVER_BASE_URL']),
  ],
  base: '',
  build: {
    emptyOutDir: false,
    minify: true,
    assetsDir: 'assets'
  },
  publicDir: '',
});
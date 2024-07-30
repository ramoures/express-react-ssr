import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin(['WEBSITE_BASE_URL', 'WEBSITE_DIRECTORY_NAME', 'WEBSITE_STATIC_TITLE', 'TWITTER_USERNAME']),
  ],
  base: '',
  build: {
    minify: true,
    cssMinify: true
  }
})

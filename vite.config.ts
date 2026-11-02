import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Keep the production bundle portable to a static-hosting subdirectory.
  base: './',
});

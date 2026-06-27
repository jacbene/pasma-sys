import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  base: '/pasma-sys/',
  server: {
    port: 3000,
  },
});


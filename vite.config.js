import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  base: '/pasma-sys/',  // ← Important : nom de votre dépôt
  server: {
    host: true,
    port: 3000
  }
});

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  base: '/pasma-sys/',
  server: {
    port: 3000,
  },
=======
  base: '/pasma-sys/',  // ← Important : nom de votre dépôt
  server: {
    host: true,
    port: 3000
  }
>>>>>>> 9a1a326 (Fix: Restauration de main.jsx et mise à jour de vite.config.js)
});

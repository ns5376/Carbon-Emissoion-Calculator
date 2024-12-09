import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  server: {
    watch: {
      usePolling: true, // Ensure file changes are detected, especially on network file systems or Docker
    },
  plugins: [eslintPlugin()],
  },
});

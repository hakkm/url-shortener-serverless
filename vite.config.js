import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist', // Still output to 'dist', just flat
    emptyOutDir: true,
    rollupOptions: {
      input: './index.html',
      output: {
        // All files go into the same folder as index.html
        assetFileNames: '[name]-[hash][extname]',
        chunkFileNames: '[name]-[hash].js',
        entryFileNames: '[name]-[hash].js',
      }
    }
  },
  server: {
    port: 3000,
    host: true
  }
});

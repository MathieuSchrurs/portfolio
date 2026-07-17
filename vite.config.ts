/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        // The main SPA and the standalone /cv document are separate entries
        // (see docs/adr/0001-cv-as-web-document.md).
        main: path.resolve(__dirname, 'index.html'),
        cv: path.resolve(__dirname, 'cv/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@context': path.resolve(__dirname, './src/context'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@fonts': path.resolve(__dirname, './src/fonts'),
      '@config': path.resolve(__dirname, './src/config.ts'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  test: {
    // Pure-logic tests run in Node (fast, no DOM). Component tests opt into
    // jsdom per-file with a `// @vitest-environment jsdom` pragma.
    environment: 'node',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
});

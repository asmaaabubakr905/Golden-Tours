import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        // Ensure assets don't have trailing slashes
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
  base: '/',
  define: {
    // Use environment variable or default to production domain
    __SITE_URL__: JSON.stringify(process.env.VITE_SITE_URL || 'https://goldenphoenixtravel.com'),
  },
});

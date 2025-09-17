import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Generate source maps for production build
    sourcemap: true,
    
    // Minify output
    minify: 'terser',
    
    // Configure chunk strategy
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            'firebase/app',
            'firebase/auth',
            'firebase/firestore'
          ]
        }
      }
    },

    // Configure chunk size warnings
    chunkSizeWarningLimit: 1000
  },
  
  // Optimize deps
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'firebase/app',
      'firebase/auth',
      'firebase/firestore'
    ]
  },
  
  // Enable faster builds in dev
  server: {
    hmr: {
      overlay: true
    }
  }
})

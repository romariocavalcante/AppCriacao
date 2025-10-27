import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['framer-motion', 'lucide-react'],
          three: ['@react-three/fiber', '@react-three/drei', 'three']
        }
      }
    },
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1000
  },
  server: {
    headers: {
      'Service-Worker-Allowed': '/'
    }
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
})

// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';


export default defineConfig({
  site: 'https://ceball0s.github.io',
  integrations: [],
  // Configuración de favicon (opcional)
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'favicon.png') {
              return 'favicon.png';
            }
            return 'assets/[name].[hash][extname]';
          }
        }
      }
    }
  }
});

// @ts-check
import { defineConfig } from 'astro/config';


export default defineConfig({
  site: 'https://ceball0s.github.io',
  integrations: [],
  // Configuración de favicon (opcional)
  vite: {
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

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      '@app': '/src/app',
      '@pages': '/src/pages',
      '@widgets': '/src/widgets',
      '@features': '/src/features',
      '@entities': '/src/entities',
      '@api': '/src/shared/api',
      '@constants': '/src/shared/config/constants',
      '@hooks': '/src/shared/lib/hooks',
      '@utils': '/src/shared/lib/utils',
      '@slices': '/src/shared/model/slices',
      '@type': '/src/shared/model/types',
      '@ui': '/src/shared/ui',
      '@assets': '/src/shared/assets',
    },
  },
});

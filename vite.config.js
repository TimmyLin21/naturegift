import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: process.env.NODE_ENV === 'production' ? '/naturegift/' : '/',
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api', 'color-functions', 'global-builtin', 'import', 'mixed-decls'],
      },
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});

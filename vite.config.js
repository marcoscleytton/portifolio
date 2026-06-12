import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

// Dynamically discover all HTML files in the root directory
const getHtmlInputs = () => {
  const files = fs.readdirSync(__dirname);
  const inputs = {};
  files.forEach(file => {
    if (file.endsWith('.html')) {
      const name = file.replace('.html', '');
      inputs[name] = resolve(__dirname, file);
    }
  });
  return inputs;
};

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    rollupOptions: {
      input: getHtmlInputs(),
    },
  },
});

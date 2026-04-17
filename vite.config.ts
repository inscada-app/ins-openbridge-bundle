import { defineConfig } from 'vite';
import { copyFileSync } from 'fs';
import { resolve } from 'path';

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  plugins: [
    {
      name: 'copy-openbridge-css',
      closeBundle() {
        copyFileSync(
          resolve(__dirname, 'node_modules/@oicl/openbridge-webcomponents/dist/openbridge.css'),
          resolve(__dirname, 'dist/openbridge.css')
        );
      },
    },
  ],
  build: {
    lib: {
      entry: 'src/inscada-bundle.ts',
      formats: ['es'],
      fileName: () => 'inscada-openbridge.min.js',
    },
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: true,
    target: 'es2020',
    rollupOptions: {
      treeshake: { moduleSideEffects: true },
      // Bundle everything into one file — no externals
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});

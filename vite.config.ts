import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'
// import viteTsconfigPaths from 'vite-tsconfig-paths';
// import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {},
  },
  build: {
    outDir: 'build',
  },
  esbuild: {
    loader: "jsx", // OR "jsx"
    include: [
      // Add this for business-as-usual behaviour for .jsx and .tsx files
      "src/**/*.jsx",
      "src/**/*.tsx",
      "node_modules/**/*.jsx",
      "node_modules/**/*.tsx",

      // Add the specific files you want to allow JSX syntax in
      "src/LocalJsxInJsComponent.js",
      "node_modules/bad-jsx-in-js-component/index.js",
      "node_modules/bad-jsx-in-js-component/js/BadJSXinJS.js",
      "node_modules/bad-jsx-in-js-component/ts/index.ts",
      "node_modules/bad-jsx-in-js-component/ts/BadTSXinTS.ts",

      // --- OR ---

      // Add these lines to allow all .js files to contain JSX
      "src/**/*.js",
      "node_modules/**/*.js",

      // Add these lines to allow all .ts files to contain JSX
      "src/**/*.ts",
      "node_modules/**/*.ts",
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      '~': path.resolve('./src'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
            global: 'globalThis',
        },
    },
},
  plugins: [
    react(), 
    // viteTsconfigPaths(),
    // svgr({
    //   include: '**/*.svg?react',
    // }),
  ],
  server: {
    host: true,
    port: 3000, // This is the port which we will use in docker
    // add the next lines if you're using windows and hot reload doesn't work
     watch: {
       usePolling: true
    }
  }
});

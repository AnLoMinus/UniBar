import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const isDocs = mode === 'docs';

  return {
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
        exclude: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx']
      })
    ],
    
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@/components': resolve(__dirname, 'src/components'),
        '@/hooks': resolve(__dirname, 'src/hooks'),
        '@/utils': resolve(__dirname, 'src/utils'),
        '@/types': resolve(__dirname, 'src/types'),
        '@/styles': resolve(__dirname, 'src/styles'),
        '@/tests': resolve(__dirname, 'src/tests')
      }
    },

    build: {
      lib: isDocs ? undefined : {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'UniBar',
        fileName: (format) => `index.${format}.js`,
        formats: ['es', 'cjs', 'umd']
      },
      rollupOptions: isDocs ? undefined : {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM'
          }
        }
      },
      sourcemap: !isProduction,
      minify: isProduction,
      outDir: isDocs ? 'docs-dist' : 'dist'
    },

    css: {
      modules: {
        localsConvention: 'camelCase'
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`
        }
      }
    },

    server: {
      port: 3000,
      open: true,
      host: true
    },

    preview: {
      port: 4173,
      open: true
    },

    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
      css: true
    },

    define: {
      __VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString())
    }
  };
});

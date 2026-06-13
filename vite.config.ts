import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import { visualizer } from 'rollup-plugin-visualizer'

import pkg from './package.json' with { type: 'json' }

const audit = process.env.VITE_AUDIT === 'true'

// Replace the `__APP_VERSION__` placeholder in index.html (Vite's `define`
// only rewrites JS, not HTML).
function htmlVersionPlugin() {
  return {
    name: 'html-app-version',
    transformIndexHtml(html: string) {
      return html.replaceAll('__APP_VERSION__', pkg.version)
    },
  }
}

// Base path for asset URLs.
// - GitHub Pages project site → '/EastEndSystems/' (default).
// - Custom domain (eastendsystems.com, served at root) → set VITE_BASE='/'.
const base = process.env.VITE_BASE || '/EastEndSystems/'

// https://vite.dev/config/
export default defineConfig({
  base,
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  plugins: [
    htmlVersionPlugin(),
    vue(),
    tailwindcss(),
    vueDevTools(),
    audit &&
      visualizer({
        filename: 'dist/stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
    audit && {
      name: 'audit-report-path',
      closeBundle() {
        console.log('\n📊 Bundle report: dist/stats.html\n')
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

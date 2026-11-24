import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build:standalone` sets STANDALONE to bundle the whole deck -
// scripts, styles, fonts and images - into one self-contained HTML file.
// Two things in Slidev's regular build stand in the way of that:
const standalone: Plugin = {
  name: 'tueai:standalone',
  enforce: 'post',
  // a single file cannot be split into chunks,
  config(config) {
    for (const options of [config.build?.rollupOptions, config.build?.rolldownOptions]) {
      for (const output of [options?.output].flat()) {
        if (output)
          delete output.manualChunks
      }
    }
  },
  // and images that are preloaded by URL are kept as separate files.
  transformIndexHtml: {
    order: 'pre',
    handler: html => html.replace(/<link rel="preload" as="image"[^>]*>\s*/g, ''),
  },
}

export default defineConfig({
  plugins: process.env.STANDALONE ? [viteSingleFile({ removeViteModuleLoader: true }), standalone] : [],
})

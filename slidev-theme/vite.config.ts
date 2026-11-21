// Vite configuration that Slidev merges into every deck using this theme.

import { sentenceSpacing } from './markdown/sentence-spacing.ts'

export default {
  slidev: {
    markdown: {
      markdownSetup: sentenceSpacing,
    },
    vue: {
      template: {
        // Let <Figure src="./figures/plot.svg" /> and <SideImage> take a path
        // relative to the slides file, like a Markdown image, so that Vite
        // processes and bundles the file. (The other entries are Vue's defaults.)
        transformAssetUrls: {
          video: ['src', 'poster'],
          source: ['src'],
          img: ['src'],
          image: ['xlink:href', 'href'],
          use: ['xlink:href', 'href'],
          Figure: ['src'],
          SideImage: ['src'],
        },
      },
    },
  },
}

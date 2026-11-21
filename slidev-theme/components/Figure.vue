<!--
  A figure, centered on a line of its own (`\includegraphics` in a `center`
  environment).

  ```md
  <Figure src="./figures/plot.svg" />
  <Figure src="./figures/photo.jpg" width="60%" caption="The new building" />
  <Figure src="./figures/diagram.svg" height="4cm" align="left" />
  ```

  Without `width` or `height`, a vector figure (SVG) has its physical size on
  the 160mm wide beamer page, as with `\includegraphics`. A plot made with
  tueplots then fits the slide, and its text is as large as that of the slide.
  Other images are shown pixel by pixel, at most as wide as the text.
-->

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** path relative to the slides file, or a file in `public/` (`/image.png`) */
  src: string
  /** `60%` of the text or column width, or a length such as `8cm`, `30mm`, `120pt` */
  width?: string
  /** a length such as `4cm` */
  height?: string
  /** small text below the figure */
  caption?: string
  align?: 'left' | 'center' | 'right'
}>(), { align: 'center' })

// cm, mm, pt and in are lengths on the beamer page, not on the screen
function length(value?: string) {
  const [, number, unit] = value?.trim().match(/^([\d.]+)\s*(cm|mm|pt|in)$/) ?? []
  if (!unit)
    return value
  return unit === 'in' ? `calc(${number} * 2.54 * var(--cm))` : `calc(${number} * var(--${unit}))`
}

const size = computed(() => ({ width: length(props.width), height: length(props.height) }))
const isVector = computed(() => /\.svg(?:[?#]|$)|^data:image\/svg/.test(props.src))
const physicalSize = computed(() => isVector.value && !props.width && !props.height)
</script>

<template>
  <figure class="tueai-figure" :class="`tueai-figure-${align}`">
    <img :src="src" :style="size" :class="{ 'tueai-figure-physical': physicalSize }" :alt="caption ?? ''">
    <figcaption v-if="caption || $slots.default">
      <slot>{{ caption }}</slot>
    </figcaption>
  </figure>
</template>

<style>
.tueai-figure {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: calc(3 * var(--pt)) 0; /* \topsep of the center environment */
}
.tueai-figure-left {
  align-items: flex-start;
}
.tueai-figure-right {
  align-items: flex-end;
}

/* One inch of the figure is one inch of the beamer page: 2.54 * 60px on the
   canvas, where a browser takes an inch to be 96px. */
.tueai-figure-physical {
  zoom: calc(2.54 * 60 / 96);
  max-width: none;
}

.tueai-figure figcaption {
  margin-top: calc(5 * var(--pt));
  font-size: calc(9 * var(--pt)); /* \small */
  line-height: calc(11 * var(--pt));
}
</style>

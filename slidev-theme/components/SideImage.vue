<!--
  An image along the left or right edge of a frame, faded into the page
  (`\EastGradImage`, `\WestGradImage`, `\EastGradPerson`, ...).

  ```md
  <SideImage src="./figures/building.jpg" />
  <SideImage src="./figures/portrait.png" side="left" caption="Ada Lovelace (1815–1852)" />
  ```

  Put it on a line of its own and keep the text out of its way with the
  `two-cols` layout. Like the beamer macros in a paragraph of their own, it
  takes up one (empty) line of the frame.
-->

<script setup lang="ts">
withDefaults(defineProps<{
  /** path relative to the slides file, or a file in `public/` (`/image.jpg`) */
  src: string
  side?: 'left' | 'right'
  /** fade the image into the page (default) */
  fade?: boolean
  /** cover the full height of the slide instead of the area below the title bar */
  fullHeight?: boolean
  /** small label on the image, e.g. the name of a person */
  caption?: string
}>(), { side: 'right', fade: true })
</script>

<template>
  <figure class="tueai-side-image" :class="[`tueai-side-image-${side}`, { 'tueai-side-image-fade': fade, 'tueai-side-image-full': fullHeight }]">
    <img :src="src" alt="">
    <figcaption v-if="caption || $slots.default">
      <slot>{{ caption }}</slot>
    </figcaption>
  </figure>
</template>

<style>
/* The figure itself is the empty line; image and caption are positioned
   relative to the slide. */
.tueai-side-image {
  height: calc(12 * var(--pt));
  margin: 0;
}
.tueai-side-image > * {
  position: absolute;
  z-index: -1;
}

.tueai-side-image img {
  bottom: 0;
  height: 86%;
  max-width: none;
}
.tueai-side-image-full img {
  height: 100%;
}
.tueai-side-image-right img {
  right: calc(-1 * var(--mm));
}
.tueai-side-image-left img {
  left: calc(-1 * var(--mm));
}
.tueai-side-image-fade.tueai-side-image-right img {
  mask-image: linear-gradient(to right, transparent, black);
}
.tueai-side-image-fade.tueai-side-image-left img {
  mask-image: linear-gradient(to left, transparent, black);
}

.tueai-side-image figcaption {
  bottom: calc(1 * var(--cm));
  padding: calc(3.333 * var(--pt));
  color: var(--tu-dark);
  background: white;
  font-size: calc(7 * var(--pt));
  line-height: calc(8 * var(--pt));
  white-space: nowrap;
}
.tueai-side-image-right figcaption {
  right: 0;
}
.tueai-side-image-left figcaption {
  left: 0;
}
</style>

<!--
  A frame with two columns (`columns` environment).

  ```md
  ---
  layout: two-cols
  cols: 60/40     # widths of the columns in percent of the text width
  ---

  # Frame title

  ::left::

  Left column

  ::right::

  Right column
  ```

  Content before `::left::` spans the full width above the columns; an
  optional `::bottom::` section spans the full width below them.
-->

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  cols?: string
}>(), { cols: '50/50' })

// widths are fractions of the text width, i.e. of the slide without its two margins
const widths = computed(() => props.cols.split('/').map(
  width => `calc(${Number.parseFloat(width) / 100} * (100% - 2 * var(--margin)))`,
))
</script>

<template>
  <TueaiFrame>
    <slot />
    <div class="tueai-columns">
      <div :style="{ width: widths[0] }">
        <slot name="left" />
      </div>
      <div :style="{ width: widths[1] }">
        <slot name="right" />
      </div>
    </div>
    <slot name="bottom" />
  </TueaiFrame>
</template>

<style>
/* As in beamer, the columns are centered on each other, and the space left
   over on the page is distributed evenly around them. */
.tueai-columns {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 calc(-1 * var(--margin));
}
.tueai-columns > div {
  flex: none;
}

/* beamer opens every column with an (empty) paragraph. A column that starts
   with a list, a block or a figure instead of text therefore sits lower than
   centered, without taking more room: by 4.3pt, measured in the beamer theme. */
.tueai-columns > div:has(> :first-child:not(p)) {
  margin: calc(2.4 * var(--pt)) 0 calc(-6.2 * var(--pt));
}
</style>

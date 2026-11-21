<!--
  A plain frame on one of the background patterns of the Graphic Toolkit
  (`\BackgroundPattern{n}`), to mark a break in the presentation.

  ```md
  ---
  layout: pattern
  pattern: 4   # 0 ... 8
  ---
  ```

  The patterns are busy: put content on them only inside a <ColorBox>.
-->

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** number of the pattern, 0 ... 8 (01A, 01B, 01C, 02A, ..., 03C) */
  pattern?: number | string
}>(), { pattern: 0 })

const patterns = import.meta.glob<string>('../assets/patterns/*.svg', { eager: true, import: 'default' })
const src = computed(() => Object.values(patterns)[Number(props.pattern)])
</script>

<template>
  <div class="tueai-slide tueai-plain tueai-pattern">
    <img class="tueai-pattern-image" :src="src" alt="">
    <slot />
  </div>
</template>

<style>
/* \FullBackground: 1.043 times the page width, hung 1mm above the top edge */
.tueai-pattern-image {
  position: absolute;
  z-index: -1;
  top: calc(-1 * var(--mm));
  left: -2.15%;
  width: 104.3%;
  max-width: none;
}
</style>

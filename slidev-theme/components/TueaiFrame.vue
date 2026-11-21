<!--
  A beamer frame: title bar, vertically centered body and footline.
  Used by the layouts; not meant to be used in slides directly.
-->

<script setup lang="ts">
import symbolWhite from '../assets/logos/TUEAI_Symbol_white_RGB.svg'

defineProps<{
  /** dark colors, as in the `darkframe` environment */
  dark?: boolean
}>()
</script>

<template>
  <div class="tueai-slide tueai-frame" :class="{ 'tueai-dark': dark }">
    <main class="tueai-frame-body">
      <slot />
    </main>
    <!-- dark frames show the symbol also without a frame title -->
    <img v-if="dark" class="tueai-frame-symbol" :src="symbolWhite" alt="">
    <TueaiFootline />
  </div>
</template>

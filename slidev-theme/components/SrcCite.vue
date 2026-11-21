<!--
  A source or link at the right end of a line, typically of the frame
  subtitle (`\srccite{url}{text}`):

  ```md
  ## plots that fit the slide <SrcCite href="https://tueplots.readthedocs.io">pip install tueplots</SrcCite>
  ```
-->

<script setup lang="ts">
defineProps<{
  href: string
}>()
</script>

<template>
  <a class="tueai-srccite" :href="href" target="_blank" rel="noreferrer"><slot /></a>
</template>

<style>
.tueai-srccite {
  float: right;
}
</style>

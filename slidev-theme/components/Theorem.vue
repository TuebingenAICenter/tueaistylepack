<!--
  A theorem-like block with an italic body (`theorem`, `lemma`, `corollary`, ...).

  ```md
  <Theorem>

  There is no largest prime number.

  </Theorem>

  <Theorem title="Lemma (Zorn)"> ... </Theorem>
  ```
-->

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
}>(), { title: 'Theorem' })
</script>

<template>
  <Block class="tueai-theorem" :title="title">
    <slot />
  </Block>
</template>

<style>
.tueai-theorem .tueai-block-body {
  font-style: italic;
}
</style>

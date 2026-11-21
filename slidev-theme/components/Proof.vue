<!--
  A proof, closed by the end-of-proof mark (`proof` environment).
-->

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
}>(), { title: 'Proof.' })
</script>

<template>
  <Block class="tueai-proof" :title="title">
    <slot />
    <div class="tueai-qed" />
  </Block>
</template>

<style>
/* The mark stands on a line of its own after a list or a formula, and at the
   end of the last line if the proof ends with text. */
.tueai-qed {
  width: calc(6.88 * var(--pt));
  height: calc(6.88 * var(--pt));
  margin: calc(3.19 * var(--pt)) 0 calc(0.54 * var(--pt)) auto;
  border: calc(0.4 * var(--pt)) solid var(--tueai-darkblue);
}
p + .tueai-qed {
  margin-top: calc(-9.4 * var(--pt));
}
</style>

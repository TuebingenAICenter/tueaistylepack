<!--
  A framed box with an optional title bar (`tcolorbox`), e.g. for a takeaway
  message on a `pattern` slide.

  ```md
  <ColorBox title="Takeaway">

  The main message.

  <template #side>

  <Figure src="./figures/qr.png" width="100%" />

  </template>
  </ColorBox>
  ```

  The optional `side` slot is set next to the text (`sidebyside`).
-->

<script setup lang="ts">
defineProps<{
  title?: string
  /** background color (`colback`), light gray by default */
  colback?: string
}>()
</script>

<template>
  <div class="tueai-colorbox">
    <div v-if="title || $slots.title" class="tueai-colorbox-title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div class="tueai-colorbox-body" :style="{ background: colback }">
      <div class="tueai-colorbox-part">
        <slot />
      </div>
      <div v-if="$slots.side" class="tueai-colorbox-part">
        <slot name="side" />
      </div>
    </div>
  </div>
</template>

<style>
/* \tcbset{colback=TueAIgray, colframe=TueAIdarkblue, coltext=TueAIdarkblue, size=small, arc=0mm} */
.tueai-colorbox {
  --parskip: calc(12 * var(--pt));
  margin: calc(7.09 * var(--pt)) 0 calc(4.33 * var(--pt));
  border: calc(0.3 * var(--mm)) solid var(--tueai-darkblue);
  color: var(--tueai-darkblue);
  text-align: justify;
  hyphens: auto;
}
.tueai-colorbox-title {
  padding: calc(2.77 * var(--pt)) calc(6.16 * var(--pt)) calc(1.45 * var(--pt));
  color: white;
  background: var(--tueai-darkblue);
}
.tueai-colorbox-body {
  display: flex;
  align-items: center;
  gap: calc(10 * var(--mm));
  padding: calc(3.08 * var(--pt)) calc(6.16 * var(--pt));
  background: var(--tueai-gray);
}
.tueai-colorbox-part {
  flex: 1;
  min-width: 0;
}
.tueai-colorbox-part > :first-child {
  margin-top: 0;
}
.tueai-colorbox-part > :last-child {
  margin-bottom: 0;
}
</style>

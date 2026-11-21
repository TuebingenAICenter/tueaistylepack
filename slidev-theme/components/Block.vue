<!--
  A titled block (`block`, `alertblock` and `exampleblock` environments).

  ```md
  <Block title="Observation">

  Text of the block, as Markdown.

  </Block>

  <Block title="Careful" type="alert"> ... </Block>
  <Block title="Example" type="example"> ... </Block>
  ```
-->

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  type?: 'default' | 'alert' | 'example'
}>(), { type: 'default' })
</script>

<template>
  <div class="tueai-block" :class="`tueai-block-${type}`">
    <div v-if="title || $slots.title" class="tueai-block-title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div class="tueai-block-body">
      <slot />
    </div>
  </div>
</template>

<style>
/* The paddings were measured in the PDF of the beamer theme. There, the height
   of a box also depends on the descenders in its first and last line; here,
   the title bar is as high as for a title without descenders ("Block") and
   the body as for a last line with descenders. */
.tueai-block {
  --block-color: var(--tueai-lightblue);
  --block-tint: 20%;
  /* colsep*=.75ex: the colored boxes reach beyond the text on both sides */
  --colsep: calc(4 * var(--pt));
  /* \medskipamount above and \smallskipamount below, towards a line of text */
  padding: calc(6.9 * var(--pt)) 0 calc(5.05 * var(--pt));
}
/* As in TeX, the skip below a block merges with the skip above what follows */
.tueai-block + .tueai-block {
  margin-top: calc(-2 * var(--pt));
}
.tueai-block + :is(ul, ol, blockquote) {
  margin-top: 0;
}
.tueai-block-alert {
  --block-color: var(--tueai-accent);
}
.tueai-block-example {
  --block-color: var(--tueai-springgreen);
  --block-tint: 10%;
}

.tueai-block-title,
.tueai-block-body {
  margin: 0 calc(-1 * var(--colsep));
}
.tueai-block-title {
  padding: calc(1.96 * var(--pt)) var(--colsep) calc(1.09 * var(--pt));
  color: white;
  background: var(--block-color);
}
.tueai-block-body {
  padding: calc(2.53 * var(--pt)) var(--colsep) calc(3.49 * var(--pt));
  color: var(--tueai-dark);
  background: color-mix(in srgb, var(--block-color) var(--block-tint), white);
}
</style>

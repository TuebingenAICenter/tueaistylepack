<!--
  A colored band across the full width of the slide, to call out important
  information (`ribbon` environment). Yellow on regular frames, white on dark ones.

  ```md
  <Ribbon>

  The one thing to remember.

  </Ribbon>
  ```
-->

<template>
  <div class="tueai-ribbon">
    <slot />
  </div>
</template>

<style>
/* wd=\paperwidth, colsep*=.3em. The beamer template opens with \vspace{.3em}
   and an empty box, which together keep about a line of space above the band. */
.tueai-ribbon {
  --item: var(--ribbon-item);
  --alert: var(--ribbon-alert);
  margin: calc(13.4 * var(--pt)) calc(-1 * var(--cm)) 0;
  padding: calc(1 * var(--pt)) calc(1 * var(--cm)) calc(1.92 * var(--pt));
  color: var(--ribbon-fg);
  background: var(--ribbon-bg);
}
.tueai-ribbon > :first-child {
  margin-top: 0;
}
.tueai-ribbon > :last-child {
  margin-bottom: 0;
}
</style>

<!--
  Stretchable vertical space (`\vfill`): pushes the content before and after
  it apart, e.g. to move a <Ribbon> to the lower part of a frame.
-->

<template>
  <div class="tueai-vfill" />
</template>

<style>
/* \vfill is `1fill`, the glue above the content of a frame as well, and the
   glue below it `1.5fill` (see styles/outer.css) */
.tueai-vfill {
  flex: 2 1 0;
}
</style>

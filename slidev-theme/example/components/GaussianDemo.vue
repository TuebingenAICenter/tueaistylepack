<!--
  A small interactive figure for the example deck: a Gaussian density whose
  mean and standard deviation follow two sliders. Components in this folder
  can be used on any slide, like the components of the theme.
-->

<script setup lang="ts">
import { computed, ref } from 'vue'

const mean = ref(0)
const std = ref(1)

// plot area in SVG units, showing x in [-4, 4] and p(x) in [0, 0.85]
const width = 360
const height = 110
const toX = (x: number) => (x + 4) / 8 * width
const toY = (p: number) => height - p / 0.85 * height

const density = (x: number) => Math.exp(-0.5 * ((x - mean.value) / std.value) ** 2) / (std.value * Math.sqrt(2 * Math.PI))

const curve = computed(() => {
  const points = Array.from({ length: 161 }, (_, i) => -4 + i / 20)
  return points.map(x => `${toX(x).toFixed(1)},${toY(density(x)).toFixed(1)}`).join(' ')
})
</script>

<template>
  <div class="gaussian-demo">
    <svg :viewBox="`-12 -4 ${width + 24} ${height + 22}`">
      <polygon class="area" :points="`0,${height} ${curve} ${width},${height}`" />
      <polyline class="curve" :points="curve" />
      <line class="mean" :x1="toX(mean)" :x2="toX(mean)" :y1="toY(density(mean))" :y2="height" />
      <line class="axis" x1="0" :x2="width" :y1="height" :y2="height" />
      <text v-for="x in [-4, -2, 0, 2, 4]" :key="x" :x="toX(x)" :y="height + 13">{{ x }}</text>
    </svg>

    <label>
      <span>mean {{ mean.toFixed(1) }}</span>
      <input v-model.number="mean" type="range" min="-3" max="3" step="0.1">
    </label>
    <label>
      <span>std. dev. {{ std.toFixed(1) }}</span>
      <input v-model.number="std" type="range" min="0.5" max="2" step="0.1">
    </label>
  </div>
</template>

<style scoped>
.gaussian-demo {
  width: calc(9.5 * var(--cm));
  margin: calc(2 * var(--mm)) auto;
}

.area {
  fill: color-mix(in srgb, var(--tueai-lightblue) 30%, transparent);
}
.curve {
  fill: none;
  stroke: var(--tueai-darkblue);
  stroke-width: 1.5;
}
.mean {
  stroke: var(--tueai-accent);
  stroke-width: 1.5;
}
.axis {
  stroke: var(--tueai-dark);
  stroke-width: 0.5;
}
text {
  fill: var(--tueai-dark);
  font-size: 9px;
  text-anchor: middle;
}

label {
  display: flex;
  align-items: center;
  gap: calc(3 * var(--mm));
  margin-top: calc(1 * var(--mm));
}
label span {
  width: 6em;
}
input {
  flex: 1;
  accent-color: var(--tueai-accent);
}
</style>

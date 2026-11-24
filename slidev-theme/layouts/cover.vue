<!--
  The title page (`\titlepage`).

  Title, subtitle, author, institute and date are read from the headmatter of
  the deck. On a later slide, the frontmatter of that slide can override them,
  e.g. to open a new part of a lecture.
-->

<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import coverArt from '../assets/logos/Logo_rotated_color.svg'
import logo from '../assets/logos/TUEAI_Logo_hor-URL_RGB.svg'
import partners from '../assets/logos/Uni-coop-MPI.svg'

const { $slidev, $frontmatter } = useSlideContext()

const info = computed(() => ({ ...$slidev.configs, ...$frontmatter }) as Record<string, string | undefined>)
</script>

<template>
  <div class="tueai-slide tueai-cover">
    <img class="tueai-cover-art" :src="coverArt" alt="">
    <img class="tueai-cover-logo" :src="logo" alt="Tübingen AI Center">
    <img class="tueai-cover-partners" :src="partners" alt="University of Tübingen, in cooperation with the Max Planck Institute for Intelligent Systems">

    <div class="tueai-cover-text">
      <h1 class="tueai-cover-title">
        {{ info.title }}
      </h1>
      <div v-if="info.subtitle" class="tueai-cover-subtitle">
        {{ info.subtitle }}
      </div>
      <div v-if="info.author" class="tueai-cover-author">
        {{ info.author }}
      </div>
      <div v-if="info.institute" class="tueai-cover-institute">
        {{ info.institute }}
      </div>
      <div v-if="info.date" class="tueai-cover-date">
        {{ info.date }}
      </div>
      <slot />
    </div>
  </div>
</template>

<style>
/* TikZ nodes keep an inner sep of .3333em around the graphics */
.tueai-cover {
  --innersep: calc(3.333 * var(--pt));
}

.tueai-cover-art {
  position: absolute;
  top: 0;
  left: calc(-3 * var(--mm) + var(--innersep));
  height: 100%;
  max-width: none;
}
.tueai-cover-logo {
  position: absolute;
  top: calc(3 * var(--mm) + var(--innersep));
  right: calc(5 * var(--mm) + var(--innersep));
  width: calc(2.5 * var(--cm));
}
.tueai-cover-partners {
  position: absolute;
  right: calc(3 * var(--mm) + var(--innersep));
  bottom: calc(3 * var(--mm) + var(--innersep));
  width: calc(8 * var(--cm));
}

/* A centered column of the text width, shifted right by a tenth of the page */
.tueai-cover-text {
  position: absolute;
  top: calc(72.275 * var(--pt));
  left: calc(10% + 1 * var(--cm));
  right: calc(-10% + 1 * var(--cm));
  text-align: center;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: calc(10 * var(--title-scale) * var(--pt));
}

/* The margins reproduce the distances between the lines of the beamer title
   page, which follow from the 8pt (institute: 4pt) padding of its boxes. */
.tueai-cover-title {
  color: var(--structure);
  font-weight: 700;
  font-size: calc(14.4 * var(--title-scale) * var(--pt));
  line-height: calc(18 * var(--pt));
}
.tueai-cover-subtitle {
  margin-top: calc(2.03 * var(--pt));
  color: var(--tueai-lightblue);
}
.tueai-cover-author {
  margin-top: calc(19.1 * var(--pt));
  color: var(--tueai-accent);
}
.tueai-cover-institute {
  margin-top: calc(11.11 * var(--pt));
  font-size: calc(7 * var(--title-scale) * var(--pt));
  line-height: calc(8 * var(--pt));
}
.tueai-cover-date {
  margin-top: calc(13.36 * var(--pt));
  color: var(--tueai-lightblue);
}
</style>

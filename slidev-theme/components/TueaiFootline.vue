<!--
  The footline of a frame: short title, short author, date and frame number.
  The texts come from the headmatter of the deck (see the README).
-->

<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'

const { $slidev, $page } = useSlideContext()

// the beamer footline sets one space before and two spaces after the dashes
const dash = ' —  '

const info = computed(() => {
  const { title, author, date, shortTitle, shortAuthor } = $slidev.configs as Record<string, string | undefined>
  return {
    title: shortTitle ?? title,
    author: shortAuthor ?? author,
    date,
  }
})
</script>

<template>
  <footer class="tueai-footline">
    <Link to="1">{{ info.title }}</Link>
    <span v-if="info.author">{{ dash }}{{ info.author }}</span>
    <span v-if="info.date">{{ dash }}{{ info.date }}</span>
    <span class="tueai-footline-number">{{ $page }}</span>
  </footer>
  <div class="tueai-footline-flag" />
</template>

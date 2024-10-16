<script setup lang="ts">
import { type RouteLocationRaw, RouterLink } from 'vue-router'

const props = defineProps<{
  url: RouteLocationRaw
}>()
</script>

<template>
  <RouterLink :to="props.url" class="p-1 text-center transition duration-400 hover:scale-105">
    <slot></slot>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps<{
  url: RouteLocationRaw
}>()
</script>

<template>
  <RouterLink :to="props.url" class="text-center hover:shadow">
    <slot></slot>
  </RouterLink>
</template>

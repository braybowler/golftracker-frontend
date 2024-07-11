<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps<{
  url: RouteLocationRaw
}>()
</script>

<template>
  <RouterLink
    :to="props.url"
    class="hover:text-white"
    active-class="underline text-white hover:text-black"
  >
    <slot></slot>
  </RouterLink>
</template>

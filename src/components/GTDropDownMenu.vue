<script setup lang="ts">
import { ref, unref } from 'vue'
import GTNavLink from './GTNavLink.vue'

const isExpanded = ref(false)
const toggleIsExpanded = () => {
  if (unref(isExpanded) === false) {
    isExpanded.value = true
  } else if (unref(isExpanded.value) === true) {
    isExpanded.value = false
  }
}
</script>

<template>
  <button @click="toggleIsExpanded()">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="hover:text-white size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  </button>
  <div v-if="isExpanded">
    <div class="flex flex-col">
      <GTNavLink :url="'/profile'" class="hover:text-white"> Profile </GTNavLink>
      <GTNavLink :url="'/settings'" class="hover:text-white"> Settings </GTNavLink>
    </div>
  </div>
</template>

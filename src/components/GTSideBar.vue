<script setup lang="ts">
import { unref, ref } from 'vue'
import GTNavLink from './GTNavLink.vue'

const isAuthed = ref(true)
const isExpanded = ref(true)

const toggleIsExpanded = () => {
  if (unref(isExpanded) === false) {
    isExpanded.value = true
  } else if (unref(isExpanded.value) === true) {
    isExpanded.value = false
  }
}
</script>

<template>
  <nav v-if="isAuthed && isExpanded" class="bg-primary w-44 h-screen p-4">
    <div class="flex flex-col space-y-2">
      <div class="flex flex-row justify-end">
        <button @click="toggleIsExpanded()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="hover:text-white size-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>
      <div>
        <GTNavLink :url="'/dashboard'" class="hover:text-white flex flex-row justify-between">
          Dashboard
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
            />
          </svg>
        </GTNavLink>
      </div>
      <div>
        <GTNavLink :url="'/golfbags'" class="hover:text-white flex flex-row justify-between">
          Golf Bags
        </GTNavLink>
      </div>
    </div>
  </nav>
  <nav v-if="isAuthed && !isExpanded" class="bg-primary w-16 h-screen p-2 justify-center">
    <div class="flex flex-col space-y-2">
      <div class="flex flex-row">
        <button @click="toggleIsExpanded()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="hover:text-white size-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      <GTNavLink :url="'/dashboard'" class="hover:text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-10"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
          />
        </svg>
      </GTNavLink>
      <GTNavLink :url="'/golfbags'" class="hover:text-white"> Golf Bags </GTNavLink>
    </div>
  </nav>
</template>
ß

<script setup lang="ts">
import { unref, ref } from 'vue'
import { useAuth } from '@/stores/auth/auth'
import GTNavLink from './GTNavLink.vue'
import GTButton from '@/components/GTButton.vue'

const auth = useAuth()
const isExpanded = ref(true)

const toggleIsExpanded = () => {
  if (!unref(isExpanded)) {
    isExpanded.value = true
  } else if (unref(isExpanded.value)) {
    isExpanded.value = false
  }
}

defineExpose({
  isExpanded
})
</script>

<template>
  <nav v-if="auth.isAuthed && isExpanded" class="bg-white w-44 h-dvh p-4">
    <div class="flex flex-col space-y-2">
      <div class="flex flex-row justify-end">
        <GTButton class="border-none" @click="toggleIsExpanded()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 transition duration-400 hover:scale-110"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </GTButton>
      </div>
      <div>
        <hr class="rounded" />
      </div>
      <div>
        <GTNavLink :url="'/dashboard'" class="flex flex-row justify-between">
          Dashboard
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1"
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
        <hr class="rounded" />
      </div>
      <div>
        <GTNavLink :url="'/golfbags'" class="flex flex-row justify-between">
          Golf Bags
          <img src="/golfbag.png" alt="" class="h-6 w-6">
        </GTNavLink>
      </div>
      <div>
        <GTNavLink :url="'/golfclubs'" class="flex flex-row justify-between">
          Golf Clubs
          <img src="/golfclub.png" alt="" class="h-6 w-6">
        </GTNavLink>
      </div>
      <div>
        <GTNavLink :url="'/golfballs'" class="flex flex-row justify-between">
          Golf Balls
          <img src="/golfball.png" alt="" class="h-6 w-6">
        </GTNavLink>
      </div>
      <div>
        <hr class="rounded" />
      </div>
      <div>
        <GTNavLink :url="'/yardages'" class="flex flex-row justify-between">
          Yardages
          <img src="/yardages.png" alt="" class="h-6 w-6">
        </GTNavLink>
      </div>
      <div>
        <GTNavLink :url="'/practicesessions'" class="flex flex-row justify-between">
          Practice
          <img src="/target.png" alt="" class="h-6 w-6">
        </GTNavLink>
      </div>
    </div>
  </nav>
  <nav v-if="auth.isAuthed && !isExpanded" class="bg-white w-16 h-screen p-2 justify-center">
    <div class="flex flex-col space-y-2">
      <div class="flex flex-row justify-end">
        <GTButton class="border-none" @click="toggleIsExpanded()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-8"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </GTButton>
      </div>
      <div>
        <hr class="rounded" />
      </div>
      <GTNavLink :url="'/dashboard'" class="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1"
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
      <div>
        <hr class="rounded" />
      </div>
      <GTNavLink :url="'/golfbags'" class="">
        <img src="/golfbag.png" alt="" class="h-10 w-10">
      </GTNavLink>
      <GTNavLink :url="'/golfclubs'" class="">
        <img src="/golfclub.png" alt="" class="h-10 w-10">
      </GTNavLink>
      <GTNavLink :url="'/golfballs'" class="">
        <img src="/golfball.png" alt="" class="h-10 w-10">
      </GTNavLink>
      <div>
        <hr class="rounded" />
      </div>
      <GTNavLink :url="'/yardages'" class="">
        <img src="/yardages.png" alt="" class="h-10 w-10">
      </GTNavLink>
      <GTNavLink :url="'/practicesessions'" class="">
        <img src="/target.png" alt="" class="h-10 w-10">
      </GTNavLink>
    </div>
  </nav>
</template>
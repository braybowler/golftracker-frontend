<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/stores/auth/auth'
import GTButton from '@/components/GTButton.vue'

const auth = useAuth()
const open = ref(false)
</script>

<template>
  <div class="flex flex-row justify-end gap-2 items-center transition duration-400 hover:scale-105">
    <GTButton class="border-none" @click="open = true">Logout</GTButton>
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
        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
      />
    </svg>
  </div>

  <Teleport to="body">
    <div
      v-if="open"
      class="fixed left-1/2 top-1/2 z-999 -ml-28 border w-70 h-24 border-black rounded-md bg-white p-2 space-y-4"
    >
      <p>Are you sure you'd like to logout?</p>
      <div class="flex flex-row justify-around">
        <GTButton @click="auth.logout()" class="transition duration-400 hover:scale-105"
          >Logout</GTButton
        >
        <GTButton @click="open = false" class="transition duration-400 hover:scale-105"
          >Cancel</GTButton
        >
      </div>
    </div>
  </Teleport>
</template>

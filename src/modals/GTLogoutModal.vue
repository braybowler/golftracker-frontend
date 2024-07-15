<script setup>
import { ref } from 'vue'
import { useAuth } from '@/stores/auth/auth'
import GTButton from '@/components/GTButton.vue'

const auth = useAuth()
const open = ref(false)
</script>

<template>
  <button @click="open = true" class="hover:text-white">Logout</button>

  <Teleport to="body">
    <div
      v-if="open"
      class="fixed left-1/2 top-1/2 z-999 -ml-28 border w-70 h-24 border-black rounded-md bg-secondary p-2 space-y-4"
    >
      <p>Are you sure you'd like to logout?</p>
      <div class="flex flex-row justify-around">
        <GTButton @click="auth.logout()" class="hover:text-white">Logout</GTButton>
        <GTButton @click="open = false" class="hover:text-white">Cancel</GTButton>
      </div>
    </div>
  </Teleport>
</template>

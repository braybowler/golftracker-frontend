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
      class="fixed left-1/2 top-1/2 z-999 border w-60 h-24 border-black rounded-md bg-secondary"
    >
      <p>Are you sure you'd like to logout?</p>
      <GTButton @click="auth.logout()" class="hover:text-white">Yes, Logout</GTButton>
      <GTButton @click="open = false" class="hover:text-white">No, Cancel</GTButton>
    </div>
  </Teleport>
</template>

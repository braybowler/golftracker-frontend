<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/stores/auth/auth'
import GTButton from '../components/GTButton.vue'

const auth = useAuth()

const logout = () => {
  auth.logout()
}
</script>

<template>
  <div class="flex flex-col justify-center">
    <GTButton @click="logout()">Logout</GTButton>
  </div>
</template>

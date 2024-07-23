<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/stores/auth/auth'

const auth = useAuth()
const baseUrl = ref<string>(import.meta.env.VITE_API_BASE_URL)
</script>

<template>
  <div>
    <p>{{ auth.user }}</p>
    <p>{{ auth.isAuthed }}</p>
  </div>
</template>

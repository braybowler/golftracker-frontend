<script setup lang="ts">
import { useAuth } from '@/stores/auth/auth'

const auth = useAuth()
</script>

<template>
  <div>
    <p>{{ auth.user }}</p>
    <p>{{ auth.isAuthed }}</p>
  </div>
</template>

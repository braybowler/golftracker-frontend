<script setup lang="ts">
import { useAuth } from '@/stores/auth/auth'

const auth = useAuth()
const user = auth.getUser
</script>

<template>
  <div>
    <p>{{ user }}</p>
    <p>{{ auth.isAuthed }}</p>
  </div>
</template>

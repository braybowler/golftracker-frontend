<script setup lang="ts">
import { useAuth } from '@/stores/auth/auth'

const auth = useAuth()
const user = auth.getUser
</script>

<template>
  <div>
    <div>
      <p> Hi, {{ user.user.name }}! </p>
      <p> {{ user.user.last_active_at ? 'Welcome back to GolfTracker.' : 'Welcome to GolfTracker' }} </p>
    </div>

    <div>

    </div>
  </div>
</template>

<script setup lang="ts">
import GTNavLink from './GTNavLink.vue'
import { useAuth } from '@/stores/auth/auth'

const auth = useAuth()
</script>

<template>
  <nav v-if="auth.isAuthed" class="bg-white w-screen">
    <div class="flex flex-row justify-around p-2">
      <GTNavLink :url="'/about'">
        About GolfTracker
      </GTNavLink>
      <GTNavLink :url="'/contact'">
        Contact Us
      </GTNavLink>
    </div>
  </nav>
</template>

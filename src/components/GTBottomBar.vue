<script setup lang="ts">
import GTNavLink from './GTNavLink.vue'
import { useAuth } from '@/stores/auth/auth'

const auth = useAuth()
</script>

<template>
  <nav v-if="auth.isAuthed" class="bg-primary w-screen">
    <div class="flex flex-row justify-around p-2">
      <div>
        <GTNavLink :url="'/about'" class="hover:text-white flex flex-row justify-between">
          About GolfTracker
        </GTNavLink>
      </div>
      <div>
        <GTNavLink :url="'/contact'" class="hover:text-white flex flex-row justify-between">
          Contact Us
        </GTNavLink>
      </div>
    </div>
  </nav>
</template>

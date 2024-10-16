<script setup lang="ts">
import { useAuth } from '@/stores/auth/auth'
import GTNavLink from './GTNavLink.vue'
import GTDropDownMenu from './GTDropDownMenu.vue'

const auth = useAuth()
</script>

<template>
  <nav v-if="auth.isAuthed" class="flex flex-row bg-white justify-end p-2">
    <div class="flex flex-row space-x-2">
      <GTDropDownMenu></GTDropDownMenu>
    </div>
  </nav>
  <nav v-else class="flex flex-row bg-white justify-between p-2">
    <div class="space-x-2">
      <GTNavLink :url="'/'">Home</GTNavLink>
      <GTNavLink :url="'/about'">About</GTNavLink>
      <GTNavLink :url="'/contact'">Contact Us</GTNavLink>
    </div>
    <div class="space-x-2">
      <GTNavLink :url="'/register'">Register</GTNavLink>
      <GTNavLink :url="'/login'">Login</GTNavLink>
    </div>
  </nav>
</template>

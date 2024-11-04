<script setup lang="ts">
import { useAuth } from '@/stores/auth/auth'
import GTNavLink from './GTNavLink.vue'
import GTDropDownMenu from './GTDropDownMenu.vue'

const auth = useAuth()
</script>

<template>
  <nav v-if="auth.isAuthed" class="flex flex-row bg-white w-full justify-between">
    <div class="flex flex-row p-2 space-x-4">
      <GTNavLink :url="'/about'"> About GolfTracker </GTNavLink>
      <GTNavLink :url="'/contact'"> Contact Us </GTNavLink>
    </div>
    <GTDropDownMenu></GTDropDownMenu>
  </nav>
  <nav v-else class="flex flex-row justify-between bg-white w-full p-2">
    <div class="flex space-x-4">
      <GTNavLink :url="'/'">Home</GTNavLink>
      <GTNavLink :url="'/about'">About</GTNavLink>
      <GTNavLink :url="'/contact'">Contact Us</GTNavLink>
    </div>
    <div class="flex space-x-4">
      <GTNavLink :url="'/register'">Register</GTNavLink>
      <GTNavLink :url="'/login'">Login</GTNavLink>
    </div>
  </nav>
</template>

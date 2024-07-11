<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/stores/auth/auth'
import GTNavLink from './GTNavLink.vue'
import GTDropDownMenu from './GTDropDownMenu.vue'

const auth = useAuth()
</script>

<template>
  <nav v-if="auth.isAuthed" class="flex flex-row bg-primary justify-end p-2">
    <div class="flex flex-row space-x-2">
      <GTDropDownMenu></GTDropDownMenu>
      <GTNavLink :url="'/logout'" class="hover:text-white"> Logout </GTNavLink>
    </div>
  </nav>
  <nav v-else class="flex flex-row bg-primary justify-between p-2">
    <div class="space-x-2">
      <GTNavLink :url="'/'" class="hover:text-white"> Home </GTNavLink>
      <GTNavLink :url="'/about'" class="hover:text-white"> About </GTNavLink>
      <GTNavLink :url="'/contact'" class="hover:text-white"> Contact Us </GTNavLink>
    </div>
    <div class="space-x-2">
      <GTNavLink :url="'/register'" class="hover:text-white"> Register with GolfTracker </GTNavLink>
      <GTNavLink :url="'/login'" class="hover:text-white"> Login to GolfTracker </GTNavLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue'
import { useAuth } from '@/stores/auth/auth'
import GTButton from '../components/GTButton.vue'

const auth = useAuth()
const email = ref('')
const password = ref('')

const login = () => {
  auth.login(unref(email), unref(password))
}
</script>

<template>
  <div class="flex flex-col w-full">
    <h1>Welcome back to GolfTracker. Please login below. <br /></h1>
    <div class="bg-secondary border border-black rounded-md flex flex-col p-4 gap-2 w-1/4">
      <div class="flex flex-row justify-between">
        <label for="email">Email</label>
        <input
          type="text"
          v-model="email"
          placeholder="Please enter an email"
          class="border border-black rounded-md"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="password">Password</label>
        <input
          type="password"
          v-model="password"
          placeholder="Please enter a password"
          class="border border-black rounded-md"
        />
      </div>
      <div class="flex flex-col justify-center">
        <GTButton @click="login()">Login</GTButton>
      </div>
    </div>
  </div>
</template>

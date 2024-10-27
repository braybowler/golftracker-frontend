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
  <div class="flex justify-center">
    <div class="">
      <h1>Welcome back to GolfTracker. Please login below. <br /></h1>
      <div class="bg-white border border-black rounded-md flex flex-col p-4 gap-2 w-full">
        <div class="flex flex-row justify-between">
          <label for="email">Email</label>
          <input
            type="text"
            v-model="email"
            placeholder="Email"
            class="border border-black rounded-md"
          />
        </div>
        <div class="flex flex-row justify-between">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            class="border border-black rounded-md"
          />
        </div>
        <div class="flex flex-col justify-center">
          <GTButton @click="login()">Login</GTButton>
        </div>
      </div>
      <p class="text-center">Haven't registered yet? Register here.<br /></p>
    </div>
  </div>
</template>

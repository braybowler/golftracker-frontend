<script setup lang="ts">
import { ref, unref } from 'vue'
import { useAuth } from '@/stores/auth/auth'
import GTButton from '../components/GTButton.vue'

const auth = useAuth()
const name = ref('')
const email = ref('')
const password = ref('')

const register = () => {
  auth.register(unref(name), unref(email), unref(password))
}
</script>

<template>
  <div class="flex justify-center">
    <div>
      <h1>
        Welcome to GolfTracker. We're happy to have you! <br />
        Please enter some basic information below and we'll get you started:
      </h1>
      <div class="bg-white border border-black rounded-md flex flex-col p-4 gap-2 w-full">
        <div class="flex flex-row justify-between">
          <label for="name">Name</label>
          <input
            type="text"
            v-model="name"
            placeholder="Name"
            class="border border-black rounded-md"
          />
        </div>
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
        <div class="flex flex-col justify-center bg-purewhite">
          <GTButton @click="register()">Register</GTButton>
        </div>
      </div>
      <p class="text-center">Already registered? Login here.<br /></p>
    </div>
  </div>
</template>

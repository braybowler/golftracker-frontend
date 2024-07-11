<script setup lang="ts">
import { ref, unref } from 'vue'
import axios from 'axios'
import router from '@/router'
import GTButton from '../components/GTButton.vue'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const email = ref('')
const password = ref('')

//TODO: Extract 'naked' axios request to a useFetch composable.
const login = () => {
  const authUrl = 'http://localhost/sanctum/csrf-cookie'
  axios
    .get(authUrl)
    .then(function (response) {
      const loginUrl = 'http://localhost/api/login'
      axios
        .post(loginUrl, { email: unref(email), password: unref(password) })
        .then(async function (response) {
          router.replace('/dashboard')
        })
        .catch(function (error) {
          console.log('post request to api/login, error: ', error)
        })
    })
    .catch(function (error) {
      console.log('post request to sanctum/csrf-cookie, error: ', error)
    })
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

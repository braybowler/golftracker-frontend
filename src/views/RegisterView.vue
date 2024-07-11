<script setup lang="ts">
import { ref, unref } from 'vue'
import axios from 'axios'
import router from '@/router'
import GTButton from '../components/GTButton.vue'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const name = ref('')
const password = ref('')
const email = ref('')

//TODO: Extract 'naked' axios request to a useFetch composable.
const register = () => {
  const authUrl = 'http://localhost/sanctum/csrf-cookie'
  axios
    .get(authUrl)
    .then(function () {
      const registerUrl = 'http://localhost/api/register'
      axios
        .post(registerUrl, {
          name: unref(name),
          password: unref(password),
          email: unref(email)
        })
        .then(function () {
          router.replace('/dashboard')
        })
        .catch(function (error) {
          console.log('post request to api/register, error: ', error)
        })
    })
    .catch(function (error) {
      console.log('post request to sanctum/csrf-cookie, error: ', error)
    })
}
</script>

<template>
  <div class="flex flex-col w-full">
    <h1>
      Welcome to GolfTracker. We're happy to have you! <br />
      Please enter some basic information below and we'll get you started:
    </h1>
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
        <label for="name">Name</label>
        <input
          type="text"
          v-model="name"
          placeholder="Please enter your name"
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
        <GTButton @click="register()">Register</GTButton>
      </div>
    </div>
  </div>
</template>

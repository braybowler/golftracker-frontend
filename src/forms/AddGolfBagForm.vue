<script setup lang="ts">
import { ref, unref } from 'vue'
import axios from 'axios'
import GTButton from '../components/GTButton.vue'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const make = ref('')
const model = ref('')
const nickname = ref('')

//TODO: Extract 'naked' axios request to a composable.
const createGolfBag = () => {
  const createGolfBagUrl = 'http://localhost/api/golfbags'
  axios
    .post(createGolfBagUrl, {
      make: unref(make),
      model: unref(model),
      nickname: unref(nickname)
    })
    .then(async function (response) {})
    .catch(function (error) {
      console.log('post request to api/golfbags, error: ', error)
    })
}
</script>

<template>
  <div class="flex flex-col">
    <p>Want to add another bag? Enter the details here:</p>
    <div class="bg-secondary border border-black rounded-md flex flex-col p-4 gap-2 w-full">
      <div class="flex flex-row justify-between">
        <label for="email">Make</label>
        <input
          type="text"
          v-model="make"
          placeholder="Please enter the make of your bag"
          class="border border-black rounded-md"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="password">Model</label>
        <input
          type="text"
          v-model="model"
          placeholder="Please enter the model of your bag"
          class="border border-black rounded-md"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="password">Nickname</label>
        <input
          type="text"
          v-model="nickname"
          placeholder="Please enter a nickname for your bag"
          class="border border-black rounded-md"
        />
      </div>
      <div class="flex flex-col justify-center">
        <GTButton @click="createGolfBag()">Create Golf Bag</GTButton>
      </div>
    </div>
  </div>
</template>

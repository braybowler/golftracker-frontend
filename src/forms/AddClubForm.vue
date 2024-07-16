<script setup lang="ts">
import { ref, unref } from 'vue'
import GTButton from '../components/GTButton.vue'

const make = ref('')
const model = ref('')
const type = ref('')
const loft = ref('')

const createClub = () => {}
</script>

<template>
  <div class="flex flex-col">
    <p>Want to add another club? Enter the details here:</p>
    <div class="bg-secondary border border-black rounded-md flex flex-col p-4 gap-2 w-full">
      <div class="flex flex-row justify-between">
        <label for="make">Make</label>
        <input
          type="text"
          v-model="make"
          placeholder="Please enter the make of your club"
          class="border border-black rounded-md"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="model">Model</label>
        <input
          type="text"
          v-model="model"
          placeholder="Please enter the model of your club"
          class="border border-black rounded-md"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="model">Club Type</label>
        <input
          type="text"
          v-model="type"
          placeholder="Please enter the type of your club"
          class="border border-black rounded-md"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="loft">Loft</label>
        <input
          type="text"
          v-model="loft"
          placeholder="Please enter the loft of your club"
          class="border border-black rounded-md"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="carry">Carry distance</label>
        <input
          type="text"
          v-model="nickname"
          placeholder="Please enter your carry distance"
          class="border border-black rounded-md"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="total">Total distance</label>
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

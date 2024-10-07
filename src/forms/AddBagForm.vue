<script setup lang="ts">
import { ref, unref } from 'vue'
import { useAxios } from '@/composables/useAxios'
import GTNavButton from '@/components/GTNavButton.vue'

const { requestMethodSelector } = useAxios()

const make = ref('')
const model = ref('')
const nickname = ref('')

const createGolfBag = async () => {
  await requestMethodSelector('POST', 'golfbags/', {
    make: unref(make),
    model: unref(model),
    nickname: unref(nickname)
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
        <GTNavButton
          @click="createGolfBag()"
          url="/golfbags"
          class="border border-black rounded-md text-center"
          >Create Golf Bag</GTNavButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue'
import { useAxios } from '@/composables/useAxios'
import GTNavButton from '@/components/GTNavButton.vue'

const { requestMethodSelector } = useAxios()

const make = ref('')
const model = ref('')

const createGolfBall = async () => {
  await requestMethodSelector('POST', 'golfballs', {
    make: unref(make),
    model: unref(model)
  })
}
</script>

<template>
  <div class="flex flex-col">
    <p>Want to add another golf ball? Enter the details here:</p>
    <div class="bg-secondary border border-black rounded-md flex flex-col p-4 gap-2 w-full">
      <div class="flex flex-row justify-between">
        <label for="email">Make</label>
        <input
          type="text"
          v-model="make"
          placeholder="Make"
          class="border border-black rounded-md"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="password">Model</label>
        <input
          type="text"
          v-model="model"
          placeholder="Model"
          class="border border-black rounded-md"
        />
      </div>
      <div class="flex flex-col justify-center">
        <GTNavButton
          @click="createGolfBall()"
          url="/golfballs"
          class="border border-black rounded-md text-center"
          >Create Golf Ball</GTNavButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, unref} from 'vue'
import GTButton from '../components/GTButton.vue'
import {useAxios} from "@/composables/useAxios";
import GTNavButton from "@/components/GTNavButton.vue";

const make = ref('')
const model = ref('')
const type = ref('')
const loft = ref(0)
const clubCategory = ref(null)
const clubType = ref(null)
const carryDistance = ref(0)
const totalDistance = ref(0)

const createGolfClub = () => {
  useAxios('POST', 'golfclubs', {
    make: unref(make),
    model: unref(model),
    type: unref(type),
    loft: unref(loft),
    carry_distance: unref(carryDistance),
    total_distance: unref(totalDistance)
  })
}
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
        <label for="clubType">Club Category</label>
        <input
            type="text"
            v-model="clubCategory"
            placeholder="Please enter the category"
            class="border border-black rounded-md"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="clubType">Club Type</label>
        <input
          type="text"
          v-model="clubType"
          placeholder="Please enter the type"
          class="border border-black rounded-md"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="loft">Loft</label>
        <input
          type="number"
          v-model="loft"
          placeholder="Please enter the loft of your club"
          class="border border-black rounded-md"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="carryDistance">Carry distance</label>
        <input
          type="number"
          v-model="carryDistance"
          placeholder="Please enter your carry distance"
          class="border border-black rounded-md"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="totalDistance">Total distance</label>
        <input
          type="number"
          v-model="totalDistance"
          placeholder="Please enter a nickname for your bag"
          class="border border-black rounded-md"
        />
      </div>
      <div class="flex flex-col justify-center">
        <GTNavButton
            @click="createGolfClub()"
            url="/golfclubs"
            class="border border-black rounded-md text-center"
        >
          Create Golf Club
        </GTNavButton>
      </div>
    </div>
  </div>
</template>

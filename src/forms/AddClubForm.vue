<script setup lang="ts">
import {computed, ref, unref} from 'vue'
import {useAxios} from "@/composables/useAxios";
import GTNavButton from "@/components/GTNavButton.vue";
import {CLUB_TYPES, ClubCategory} from "@/common/enums";

const make = ref('')
const model = ref('')
const type = ref('')
const loft = ref(0)
const clubCategory = ref(null)
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
          placeholder="Make"
          class="w-1/2 border border-black rounded-md"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="model">Model</label>
        <input
          type="text"
          v-model="model"
          placeholder="Model"
          class="w-1/2 border border-black rounded-md"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="clubCategory">Club Category</label>
        <select class="w-1/2 border border-black rounded-md" v-model="clubCategory">
          <option v-for="(value, key) in ClubCategory" :value="key"> {{value}}</option>
        </select>
      </div>
<!--      <div v-if="clubCategory" class="flex flex-row justify-between">-->
<!--        <label for="clubType">Club Type</label>-->
<!--        <select class="w-1/2 border border-black rounded-md" v-model="clubType">-->
<!--          <option v-for="type in ClubType" :value="type">{{type}}</option>-->
<!--        </select>-->
<!--      </div>-->
      <div class="flex flex-row justify-between">
        <label for="loft">Loft</label>
        <input
          type="number"
          v-model="loft"
          class="w-1/2 border border-black rounded-md"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="carryDistance">Carry distance</label>
        <input
          type="number"
          v-model="carryDistance"
          class="w-1/2 border border-black rounded-md"
        />
      </div>
      <div class="flex flex-row justify-between">
        <label for="totalDistance">Total distance</label>
        <input
          type="number"
          v-model="totalDistance"
          class="w-1/2 border border-black rounded-md"
        />
      </div>
      <div class="flex flex-col justify-center">
        <GTNavButton
            @click="createGolfClub()"
            url="/golfclubs"
            class="w-1/2 border border-black rounded-md text-center"
        >
          Create Golf Club
        </GTNavButton>
      </div>
    </div>
  </div>
</template>

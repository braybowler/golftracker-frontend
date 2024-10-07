<script setup lang="ts">
import { computed, ref, unref } from 'vue'
import { useAxios } from '@/composables/useAxios'
import GTNavButton from '@/components/GTNavButton.vue'
import { CLUB_TYPES, ClubCategory } from '@/common/enums'

const { requestMethodSelector } = useAxios()

const make = ref('')
const model = ref('')
const loft = ref(0)
const category = ref('')
const type = ref('')
const carryDistance = ref(0)
const totalDistance = ref(0)

const clubCategories = Object.values(ClubCategory)
const clubTypes = computed(() => {
  return category.value ? CLUB_TYPES[category.value as ClubCategory] : []
})

const createGolfClub = async () => {
  await requestMethodSelector('POST', 'golfclubs', {
    make: unref(make),
    model: unref(model),
    loft: unref(loft),
    club_category: unref(category),
    club_type: unref(type),
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
        <label for="category">Club Category</label>
        <select class="w-1/2 border border-black rounded-md" v-model="category">
          <option value="" disabled>Select a category</option>
          <option :key="category" v-for="category in clubCategories" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
      <div v-if="category" class="flex flex-row justify-between">
        <label for="type">Club Category</label>
        <select class="w-1/2 border border-black rounded-md" v-model="type">
          <option value="" disabled>Select a type</option>
          <option :key="type" v-for="type in clubTypes" :value="type">{{ type }}</option>
        </select>
      </div>
      <div class="flex flex-row justify-between">
        <label for="loft">Loft</label>
        <input type="number" v-model="loft" class="w-1/2 border border-black rounded-md" />
      </div>
      <div class="flex flex-row justify-between">
        <label for="carryDistance">Carry distance</label>
        <input type="number" v-model="carryDistance" class="w-1/2 border border-black rounded-md" />
      </div>
      <div class="flex flex-row justify-between">
        <label for="totalDistance">Total distance</label>
        <input type="number" v-model="totalDistance" class="w-1/2 border border-black rounded-md" />
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

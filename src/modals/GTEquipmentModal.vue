<script setup lang="ts">
import { ref, unref } from 'vue'
import GTButton from '@/components/GTButton.vue'
import type { Ref } from 'vue'
import { useAxios } from '@/composables/useAxios.js'

const props = defineProps<{
  golfBagId: number
}>()

const open = ref(false)
const selectedClub = ref(null)
const selectedBall = ref(null)

const { requestData: golfBalls }: { requestData: Ref } = useAxios('GET', 'golfballs/')
const { requestData: golfClubs }: { requestData: Ref } = useAxios('GET', 'golfclubs/')

const addGearToBag = () => {
  if (selectedClub.value) {
    useAxios('POST', 'baggables', {
      bag: {
        id: props.golfBagId
      },
      baggable: unref(selectedClub)
    })
  }
  if (selectedBall.value) {
    useAxios('POST', 'baggables', {
      bag: {
        id: props.golfBagId
      },
      baggable: unref(selectedBall)
    })
  }
}

const clearSelections = () => {
  selectedBall.value = null
  selectedClub.value = null
}
</script>

<template>
  <GTButton @click="open = true" class="hover:text-white">Add Gear</GTButton>

  <Teleport to="body">
    <div
      v-if="open"
      class="fixed left-1/2 top-1/3 z-999 -ml-28 border w-96 h-30 border-black rounded-md bg-secondary p-2 space-y-4"
    >
      <p>Select equipment to add to this bag.</p>
      <div class="flex flex-row justify-between">
        <label for="category">Golf Club</label>
        <select class="w-1/2 border border-black rounded-md" v-model="selectedClub">
          <option value="" disabled>Select a club</option>
          <option :key="golfClub.id" v-for="golfClub in golfClubs" :value="golfClub">
            {{ golfClub.make }}: {{ golfClub.model }} - {{ golfClub.club_type }}
          </option>
        </select>
      </div>
      <div class="flex flex-row justify-between">
        <label for="type">Golf Ball</label>
        <select class="w-1/2 border border-black rounded-md" v-model="selectedBall">
          <option value="" disabled>Select a golf ball</option>
          <option :key="golfBall.id" v-for="golfBall in golfBalls" :value="golfBall">
            {{ golfBall.make }}: {{ golfBall.model }}
          </option>
        </select>
      </div>
      <div class="flex flex-row justify-between">
        <div>
          <GTButton
            @click="
              addGearToBag();
              clearSelections();
              open = false
            "
            >Add Equipment</GTButton
          >
        </div>
        <div>
          <GTButton
            @click="
              clearSelections();
              open = false
            "
            >Cancel</GTButton
          >
        </div>
      </div>
    </div>
  </Teleport>
</template>

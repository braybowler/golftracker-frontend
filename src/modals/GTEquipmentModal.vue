<script setup lang="ts">
import { onMounted, ref, unref } from 'vue'
import GTButton from '@/components/GTButton.vue'
import { useAxios } from '@/composables/useAxios.js'
import type { GolfBall, GolfClub } from '@/common/resources'

const props = defineProps<{
  golfBagId: number
}>()

const open = ref(false)
const selectedClub = ref(null)
const selectedBall = ref(null)
const golfBalls = ref<Array<GolfBall>>([])
const golfClubs = ref<Array<GolfClub>>([])

const { requestMethodSelector } = useAxios()

onMounted(async () => {
  golfBalls.value = await requestMethodSelector('GET', 'golfballs/')
  golfClubs.value = await requestMethodSelector('GET', 'golfclubs/')
})

const addGearToBag = async () => {
  if (selectedClub.value) {
    await requestMethodSelector('POST', 'baggables', {
      bag: {
        id: props.golfBagId
      },
      baggable: unref(selectedClub)
    })
  }
  if (selectedBall.value) {
    await requestMethodSelector('POST', 'baggables', {
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

const handleAddEquipmentButtonClick = () => {
  addGearToBag()
  clearSelections()
  open.value = false
}

const handleCancelButtonClick = () => {
  clearSelections()
  open.value = false
}
</script>

<template>
  <GTButton @click="open = true" class="p-1">Add Gear</GTButton>

  <Teleport to="body">
    <div
      v-if="open"
      class="fixed left-1/2 top-1/3 z-999 -ml-28 border w-96 h-30 border-black rounded-md bg-white p-2 space-y-4"
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
          <GTButton @click="handleAddEquipmentButtonClick()"> Add Equipment </GTButton>
        </div>
        <div>
          <GTButton @click="handleCancelButtonClick()"> Cancel </GTButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>

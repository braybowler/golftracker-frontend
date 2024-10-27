<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import GTButton from '@/components/GTButton.vue'
import type { GolfClub } from '@/common/resources'
import { useAxios } from '@/composables/useAxios'
import { SwingType } from '@/common/enums'

const open = ref(false)
const selectedClub = ref<GolfClub | null>(null)
const selectedSwingType = ref<string | null>(null)
const golfClubs = ref<Array<GolfClub>>([])
const calibrationShots = {
  'PW': {
    '50%': [
      {
        carry_distance: null,
        total_distance: null,
      }
    ],
    '75%': [
      {
        carry_distance: null,
        total_distance: null,
      }
    ],
    '100%': [
      {
        carry_distance: null,
        total_distance: null,
      }
    ]
  },
  '9i': {
    '50%': [
      {
        carry_distance: null,
        total_distance: null,
      }
    ],
    '75%': [
      {
        carry_distance: null,
        total_distance: null,
      }
    ],
    '100%': [
      {
        carry_distance: null,
        total_distance: null,
      }
    ]
  }
}
const selectedClubType = computed(() => {
  return selectedClub.value?.club_type ?? null
})

const { requestMethodSelector } = useAxios()

onMounted(async () => {
  golfClubs.value = await requestMethodSelector('GET', 'golfclubs/')
})

const addNewCalibrationShot = () => {
  if (!calibrationShots.clubTypeIndex.swingTypeIndex) {
    calibrationShots.clubTypeIndex.swingTypeIndex = []
  }

  calibrationShots.clubTypeIndex.swingTypeIndex.push({
    carry_distance: null,
    total_distance: null,
  })
}

const clearModal = () => {
  open.value = false
  selectedClub.value = null
  selectedSwingType.value = null
}
</script>

<template>
  <div class="flex flex-row justify-end gap-2 items-center transition duration-400 hover:scale-105">
    <GTButton @click="open = true">Calibrate Yardages</GTButton>
  </div>

  <Teleport to="body">
    <div
      v-if="open"
      class="fixed left-1/4 top-1/4 z-999 w-5/6 -ml-52 border border-black rounded-md bg-white p-2 space-y-4"
    >
      <p>Let's calculate your average yardages. To begin, select a club to calibrate and the swing type you are working on.</p>

      <div class="flex flex-row">
        <div class="flex flex-col w-1/3">
          <h2>Golf Club</h2>
          <label :key="golfClub.id" v-for="golfClub in golfClubs">
            <input type="radio" v-model="selectedClub" :value="golfClub">
            <span> {{ golfClub.make }} {{ golfClub.model }}: {{ golfClub.club_type }} </span>
          </label>
        </div>

        <div class="flex flex-col w-1/3">
          <h2>Swing Type</h2>
          <label :key="type" v-for="type in Object.values(SwingType)">
            <input type="radio" v-model="selectedSwingType" :value="type">
            <span> {{ type }} </span>
          </label>
        </div>

        <div class="border border-black bg-purewhite h-auto w-full">
          <div v-if="selectedClub && selectedSwingType">
            <table>
              <thead>
                <tr>
                  <th>Shot</th>
                  <th>Carry</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span>1</span>
                  </td>
                  <td>
                    <input class="bg-white" type="number">
                  </td>
                  <td>
                    <input class="bg-white" type="number">
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="flex justify-center p-2">
              <GTButton @click="addNewCalibrationShot()">Add Another Shot</GTButton>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-row justify-around">
        <GTButton @click="" class="transition duration-400 hover:scale-105"
          >Save Yardages</GTButton
        >
        <GTButton @click="clearModal()" class="transition duration-400 hover:scale-105"
          >Cancel</GTButton
        >
      </div>
    </div>
  </Teleport>
</template>

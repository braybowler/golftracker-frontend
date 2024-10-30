<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import GTButton from '@/components/GTButton.vue'
import type { GolfClub } from '@/common/resources'
import { useAxios } from '@/composables/useAxios'
import { SwingType } from '@/common/enums'

interface Shot {
  carry_distance: number
  total_distance: number
}

const open = ref(false)
const selectedClub = ref<GolfClub | null>(null)
const selectedClubType = computed(() => {
  return selectedClub.value?.club_type ?? null
})
const selectedSwingType = ref<SwingType | null>(null)
const selectedNumberOfShots = ref<number | null>(null)
const golfClubs = ref<Array<GolfClub>>([])

const calibrationShots = reactive({})

const updateCarryDistance = (newDistance: number, shotIndex: number) => {
  if (!calibrationShots[selectedClubType.value]) {
    calibrationShots[selectedClubType.value] = {}
  }

  if(!calibrationShots[selectedClubType.value][selectedSwingType.value]) {
    calibrationShots[selectedClubType.value][selectedSwingType.value] = []
  }

  if (
    calibrationShots[selectedClubType.value] &&
    calibrationShots[selectedClubType.value][selectedSwingType.value] &&
    calibrationShots[selectedClubType.value][selectedSwingType.value][shotIndex - 1]
  ) {
    calibrationShots[selectedClubType.value][selectedSwingType.value][
      shotIndex - 1
    ].carry_distance = newDistance
  } else {
    calibrationShots[selectedClubType.value][selectedSwingType.value][shotIndex - 1] = {
      carry_distance: newDistance,
      total_distance: 0
    }
  }
}

const updateTotalDistance = (newDistance: number, shotIndex: number) => {
  if (!calibrationShots[selectedClubType.value]) {
    calibrationShots[selectedClubType.value] = {}
  }

  if(!calibrationShots[selectedClubType.value][selectedSwingType.value]) {
    calibrationShots[selectedClubType.value][selectedSwingType.value] = []
  }

  if (
    calibrationShots[selectedClubType.value] &&
    calibrationShots[selectedClubType.value][selectedSwingType.value] &&
    calibrationShots[selectedClubType.value][selectedSwingType.value][shotIndex - 1]
  ) {
    calibrationShots[selectedClubType.value][selectedSwingType.value][
      shotIndex - 1
    ].total_distance = newDistance
  } else {
    calibrationShots[selectedClubType.value][selectedSwingType.value][shotIndex - 1] = {
      carry_distance: 0,
      total_distance: newDistance
    }
  }
}

const averageCarry = computed(() => {
  const shots = calibrationShots[selectedClubType.value]?.[selectedSwingType.value] ?? []

  if (shots.length === 0) {
    return 0
  }

  let relevantShots = 0
  shots.forEach((shot: Shot) => {
    if (shot.carry_distance != 0) {
      relevantShots++
    }
  })

  if (relevantShots === 0) {
    return 0
  }

  return shots.reduce((sum: number, shot: Shot) => sum + +shot.carry_distance, 0) / relevantShots
})

const averageTotal = computed(() => {
  const shots = calibrationShots[selectedClubType.value]?.[selectedSwingType.value] ?? []

  if (shots.length === 0) {
    return 0
  }

  let relevantShots = 0
  shots.forEach((shot: Shot) => {
    if (shot.total_distance != 0) {
      relevantShots++
    }
  })

  if (relevantShots === 0) {
    return 0
  }

  return shots.reduce((sum: number, shot: Shot) => sum + +shot.total_distance, 0) / relevantShots
})

const { requestMethodSelector } = useAxios()

onMounted(async () => {
  golfClubs.value = await requestMethodSelector('GET', 'golfclubs/')
})

const clearModal = () => {
  open.value = false
  selectedClub.value = null
  selectedSwingType.value = null
  selectedNumberOfShots.value = null
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
      <div>
        <p>Let's calculate your average yardages.</p>
        <p>
          To begin, select a club to calibrate,the swing type you are working on, and the number of
          shots you want in the average.
        </p>
      </div>

      <div class="flex flex-row">
        <div class="flex flex-col w-1/3">
          <h2>Golf Club</h2>
          <label :key="golfClub.id" v-for="golfClub in golfClubs">
            <input type="radio" v-model="selectedClub" :value="golfClub" />
            <span> {{ golfClub.make }} {{ golfClub.model }}: {{ golfClub.club_type }} </span>
          </label>
        </div>

        <div class="flex flex-col w-1/3">
          <h2>Swing Type</h2>
          <label :key="type" v-for="type in Object.values(SwingType)">
            <input type="radio" v-model="selectedSwingType" :value="type" />
            <span> {{ type }} </span>
          </label>
        </div>

        <div class="flex flex-col w-1/3">
          <h2>Number of Shots</h2>
          <label>
            <input type="radio" v-model="selectedNumberOfShots" :value="5" />
            <span> 5 </span>
          </label>
          <label>
            <input type="radio" v-model="selectedNumberOfShots" :value="10" />
            <span> 10 </span>
          </label>
          <label>
            <input type="radio" v-model="selectedNumberOfShots" :value="20" />
            <span> 20 </span>
          </label>
        </div>

        <div class="border border-black bg-purewhite h-auto w-full">
          <div
            class="flex flex-row justify-center gap-2 p-2"
            v-if="selectedClubType && selectedSwingType && selectedNumberOfShots"
          >
            <table>
              <thead>
                <tr>
                  <th>Shot</th>
                  <th>Carry</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr :key="index" v-for="index in selectedNumberOfShots">
                  <td>
                    <span>{{ index }}</span>
                  </td>
                  <td>
                    <input
                      class="bg-white"
                      type="number"
                      :value="
                        calibrationShots[selectedClubType]?.[selectedSwingType]?.[index - 1]
                          ?.carry_distance
                      "
                      @change="updateCarryDistance($event.target.value, index)"
                    />
                  </td>
                  <td>
                    <input
                      class="bg-white"
                      type="number"
                      :value="
                        calibrationShots[selectedClubType]?.[selectedSwingType]?.[index - 1]
                          ?.total_distance
                      "
                      @change="updateTotalDistance($event.target.value, index)"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="flex flex-col items-center justify-center">
              <div>
                <p>Avg. Carry: {{ parseFloat(averageCarry.toFixed(2)) }}</p>
                <p>Avg. Total: {{ parseFloat(averageTotal.toFixed(2)) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-row justify-around">
        <GTButton class="transition duration-400 hover:scale-105">Save Yardages</GTButton>
        <GTButton @click="clearModal()" class="transition duration-400 hover:scale-105"
          >Cancel</GTButton
        >
      </div>
    </div>
  </Teleport>
</template>

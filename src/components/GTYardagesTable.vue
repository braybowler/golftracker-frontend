<script setup lang="ts">
import { onMounted, ref, unref, watch } from 'vue'
import { useAxios } from '@/composables/useAxios'
import GTButton from '@/components/GTButton.vue'
import type { GolfClub } from '@/common/resources'

const golfClubs = ref<Array<GolfClub>>([])

const { requestMethodSelector } = useAxios()

onMounted(async () => {
  golfClubs.value = await requestMethodSelector('GET', 'golfclubs/')
})

const sortedGolfClubs = ref<Array<GolfClub>>([])
const sortGolfClubs = () => {
  sortedGolfClubs.value = [...golfClubs.value].sort((a, b) => {
    if (a.sort_index === b.sort_index) {
      return a.carry_distance - b.carry_distance
    }
    return a.sort_index - b.sort_index
  })
}

watch(golfClubs, () => {
  sortGolfClubs()
})

const isInEditMode = ref(false)

const toggleIsInEditMode = () => {
  if (!unref(isInEditMode)) {
    isInEditMode.value = true
  } else if (unref(isInEditMode.value)) {
    updateYardages()
    isInEditMode.value = false
  }
}

const updateYardages = () => {
  console.log('...updating yardages.')
}

defineExpose({
  golfClubs,
  sortedGolfClubs,
  isInEditMode
})
</script>

<template>
  <div class="flex flex-col justify-center align-items-center">
    <div class="yardages-table">
      <table>
        <thead>
          <tr>
            <th rowspan="3">Club</th>
            <th colspan="6">Swing Type</th>
          </tr>
          <tr>
            <th colspan="2">50%</th>
            <th colspan="2">75%</th>
            <th colspan="2">Full</th>
          </tr>
          <tr>
            <th>Carry</th>
            <th>Total</th>
            <th>Carry</th>
            <th>Total</th>
            <th>Carry</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(club, index) in sortedGolfClubs" :key="index" class="h-10">
            <td>{{ club.make }} {{ club.model }}: {{ club.club_type }}</td>

            <!-- 50% Swing -->
            <td>
              <template v-if="isInEditMode">
                <input type="number" placeholder="Enter carry" class="w-full" />
              </template>
              <template v-else> </template>
            </td>
            <td>
              <template v-if="isInEditMode">
                <input type="number" placeholder="Enter total" class="w-full" />
              </template>
              <template v-else> </template>
            </td>

            <!-- 75% Swing -->
            <td>
              <template v-if="isInEditMode">
                <input type="number" placeholder="Enter carry" class="w-full" />
              </template>
              <template v-else> </template>
            </td>
            <td>
              <template v-if="isInEditMode">
                <input type="number" placeholder="Enter total" class="w-full" />
              </template>
              <template v-else> </template>
            </td>

            <!-- Full Swing -->
            <td>
              <template v-if="isInEditMode">
                <input
                  type="number"
                  v-model.number="club.carry_distance"
                  placeholder="Enter carry"
                  class="w-full"
                />
              </template>
              <template v-else>
                {{ club.carry_distance }}
              </template>
            </td>
            <td>
              <template v-if="isInEditMode">
                <input
                  type="number"
                  v-model.number="club.total_distance"
                  placeholder="Enter total"
                  class="w-full"
                />
              </template>
              <template v-else>
                {{ club.total_distance }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-center items-center w-full mt-2">
      <GTButton @click="toggleIsInEditMode()"> {{ isInEditMode ? 'Save Edits' : 'Edit' }}</GTButton>
    </div>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid black;
}

th {
  background-color: #f1f5f9;
}
</style>

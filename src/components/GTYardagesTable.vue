<script setup lang="ts">
import { onMounted, ref, unref } from 'vue'
import { useAxios } from '@/composables/useAxios'
import GTButton from '@/components/GTButton.vue'
import type { GolfClub } from '@/common/resources'
import GTTableCell from '@/components/GTTableCellContent.vue'
import GTYardagesModal from '@/modals/GTYardagesModal.vue'
import GTNavButton from '@/components/GTNavButton.vue'

const golfClubs = ref<Array<GolfClub>>([])
const createGolfClubUrl = 'golfclubs/create'
const isYardagesModalOpen = ref(false);

const { requestMethodSelector } = useAxios()

onMounted(async () => {
  golfClubs.value = await requestMethodSelector('GET', 'golfclubs/')
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
  isInEditMode
})
</script>

<template>
  <div>
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
              <th colspan="2">100%</th>
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
            <tr v-for="(club, index) in golfClubs" :key="index" class="h-10">
              <td>{{ club.make }} {{ club.model }}: {{ club.club_type }}</td>

              <!-- 50% Swing -->
              <td>
                <GTTableCell
                  display-property="carry_distance"
                  :is-in-edit-mode="isInEditMode"
                  placeholder="Enter carry"
                  target-swing-type="50%"
                  :golf-club="club"
                />
              </td>
              <td>
                <GTTableCell
                  display-property="total_distance"
                  :is-in-edit-mode="isInEditMode"
                  placeholder="Enter total"
                  target-swing-type="50%"
                  :golf-club="club"
                />
              </td>

              <!-- 75% Swing -->
              <td>
                <GTTableCell
                  display-property="carry_distance"
                  :is-in-edit-mode="isInEditMode"
                  placeholder="Enter carry"
                  target-swing-type="75%"
                  :golf-club="club"
                />
              </td>
              <td>
                <GTTableCell
                  display-property="total_distance"
                  :is-in-edit-mode="isInEditMode"
                  placeholder="Enter total"
                  target-swing-type="75%"
                  :golf-club="club"
                />
              </td>

              <!-- Full Swing -->
              <td>
                <GTTableCell
                  display-property="carry_distance"
                  :is-in-edit-mode="isInEditMode"
                  placeholder="Enter carry"
                  target-swing-type="100%"
                  :golf-club="club"
                />
              </td>
              <td>
                <GTTableCell
                  display-property="total_distance"
                  :is-in-edit-mode="isInEditMode"
                  placeholder="Enter total"
                  target-swing-type="100%"
                  :golf-club="club"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex flex-row justify-between">
        <div class="flex flex-row justify-center items-center w-1/2">
          <div class="flex justify-center items-center m-2">
            <GTYardagesModal></GTYardagesModal>
          </div>
          <div class="flex justify-center items-center m-2">
            <GTButton @click="toggleIsInEditMode()">
              {{ isInEditMode ? 'Save Edits' : 'Enter Cell Edit Mode' }}</GTButton
            >
          </div>
        </div>

        <div class="flex flex-row justify-center items-center w-1/2">
          <GTNavButton :url="createGolfClubUrl" class="flex justify-center items-center border border-black rounded-md m-2">
            Add A New Club
          </GTNavButton>
        </div>
      </div>
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
  background-color: #f4f4f4;
}
</style>

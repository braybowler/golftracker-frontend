<script setup lang="ts">
import { type Ref } from 'vue'
import { useAxios } from '@/composables/useAxios'

const { requestData: golfClubs }: { requestData: Ref } = useAxios('GET', 'golfclubs/')

</script>

<template>
  <div class="yardages-table">
    <table>
      <thead>
        <tr>
          <th rowspan="3">Club</th>
          <th colspan="6">Swing Type</th>
          <th rowspan="3">Tools</th>
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
        <tr v-for="(club, index) in golfClubs" :key="index">
          <td>
            {{club.make}} {{club.model}}: {{club.club_type}}
          </td>

          <!-- 50% Swing -->
          <td>
            <input
              type="number"
              placeholder="Enter carry"
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Enter total"
            />
          </td>

          <!-- 75% Swing -->
          <td>
            <input
              type="number"
              placeholder="Enter carry"
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Enter total"
            />
          </td>

          <!-- Full Swing -->
          <td>
            <input
              type="number"
              v-model.number="club.carry_distance"
              placeholder="Enter carry"
            />
          </td>
          <td>
            <input
              type="number"
              v-model.number="club.total_distance"
              placeholder="Enter total"
            />
          </td>

          <!-- Tools -->
          <td>
            Edit
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid black;
}

th {
  background-color: #f1f5f9;
}
</style>
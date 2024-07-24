<script setup lang="ts">
import { useAxios } from '@/composables/useAxios'
import GTClubCard from '../../components/cards/GTClubCard.vue'
import type { Ref } from 'vue'

const { requestData: golfClubs }: { requestData: Ref } = useAxios('GET', 'golfclubs/')
</script>

<template>
  <div class="flex justify-between">
    <div v-if="golfClubs" class="space-y-4">
      <ul :key="golfClub.id" v-for="golfClub in golfClubs">
        <GTClubCard :golfClub></GTClubCard>
      </ul>
    </div>
  </div>
</template>

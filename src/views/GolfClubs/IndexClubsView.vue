<script setup lang="ts">
import { useAxios } from '@/composables/useAxios'
import GTClubCard from '../../components/cards/GTClubCard.vue'
import type { Ref } from 'vue'
import GTNavButton from '@/components/GTNavButton.vue'

const createUrl = 'golfclubs/create'
const { requestData: golfClubs }: { requestData: Ref } = useAxios('GET', 'golfclubs/')
</script>

<template>
  <div class="flex flex-col">
    <GTNavButton :url="createUrl" class="border rounded-md border-black text-center w-1/5"
      >Add A New Club</GTNavButton
    >
    <div v-if="golfClubs" class="mt-2 space-y-2 w-1/5">
      <ul :key="golfClub.id" v-for="golfClub in golfClubs">
        <GTClubCard :golfClub></GTClubCard>
      </ul>
    </div>
  </div>
</template>

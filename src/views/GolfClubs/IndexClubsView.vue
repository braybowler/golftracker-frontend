<script setup lang="ts">
import { useAxios } from '@/composables/useAxios'
import GTClubCard from '../../components/cards/GTClubCard.vue'
import { onMounted, ref } from 'vue'
import GTNavButton from '@/components/GTNavButton.vue'
import type { GolfClub } from '@/common/resources'

const createUrl = 'golfclubs/create'
const golfClubs = ref<Array<GolfClub>>([])

const { requestMethodSelector } = useAxios()

onMounted(async () => {
  golfClubs.value = await requestMethodSelector('GET', 'golfclubs/')
})

function handleDelete(golfClubId: number) {
  const deleteUrl = 'golfclubs/' + golfClubId
  requestMethodSelector('DELETE', deleteUrl)
  golfClubs.value = golfClubs.value.filter((golfClub: GolfClub) => golfClub.id !== golfClubId)
}
</script>

<template>
  <div class="flex flex-col">
    <GTNavButton :url="createUrl" class="border rounded-md border-black text-center w-1/5">
      Add A New Club
    </GTNavButton>
    <div v-if="golfClubs" class="mt-2 space-y-2 w-1/5">
      <GTClubCard
        :key="golfClub.id"
        v-for="golfClub in golfClubs"
        :golfClub
        @delete-golf-club="handleDelete"
      ></GTClubCard>
    </div>
  </div>
</template>

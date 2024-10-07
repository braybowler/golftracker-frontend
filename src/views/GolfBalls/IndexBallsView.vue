<script setup lang="ts">
import { useAxios } from '@/composables/useAxios'
import GTBallCard from '../../components/cards/GTBallCard.vue'
import { onMounted, ref } from 'vue'
import GTNavButton from '@/components/GTNavButton.vue'
import type { GolfBall } from '@/common/resources'

const createUrl = 'golfballs/create'
const golfBalls = ref<Array<GolfBall>>([])

const { requestMethodSelector } = useAxios()

onMounted(async () => {
  golfBalls.value = await requestMethodSelector('GET', 'golfballs/')
})

function handleDelete(golfBallId: number) {
  const deleteUrl = 'golfballs/' + golfBallId
  requestMethodSelector('DELETE', deleteUrl)
  golfBalls.value = golfBalls.value.filter((golfBall: GolfBall) => golfBall.id !== golfBallId)
}
</script>

<template>
  <div class="flex flex-col">
    <GTNavButton :url="createUrl" class="border rounded-md border-black text-center w-1/5"
      >Add A New Golf Ball</GTNavButton
    >
    <div v-if="golfBalls" class="mt-2 space-y-2 w-1/5">
      <GTBallCard
        v-for="golfBall in golfBalls"
        :key="golfBall.id"
        :golfBall
        @delete-golf-ball="handleDelete"
      ></GTBallCard>
    </div>
  </div>
</template>

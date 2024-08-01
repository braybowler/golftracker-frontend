<script setup lang="ts">
import { useAxios } from '@/composables/useAxios'
import GTBallCard from '../../components/cards/GTBallCard.vue'
import type { Ref } from 'vue'
import GTNavButton from '@/components/GTNavButton.vue'

const createUrl = 'golfballs/create'
const { requestData: golfBalls }: { requestData: Ref } = useAxios('GET', 'golfballs/')
</script>

<template>
  <div class="flex flex-col">
    <GTNavButton :url="createUrl" class="border rounded-md border-black text-center w-1/5"
      >Add A New Golf Ball</GTNavButton
    >
    <div v-if="golfBalls" class="mt-2 space-y-2 w-1/5">
      <ul :key="golfBall.id" v-for="golfBall in golfBalls">
        <GTBallCard :golfBall></GTBallCard>
      </ul>
    </div>
  </div>
</template>

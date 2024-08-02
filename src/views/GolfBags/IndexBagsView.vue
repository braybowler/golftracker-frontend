<script setup lang="ts">
import { useAxios } from '@/composables/useAxios'
import GTBagCard from '../../components/cards/GTBagCard.vue'
import type { Ref } from 'vue'
import GTNavButton from '@/components/GTNavButton.vue'

const createUrl = 'golfbags/create'
const { requestData: golfBags }: { requestData: Ref } = useAxios('GET', 'golfbags/')

function handleDelete(golfBagId: number) {
  const deleteUrl = 'golfbags/' + golfBagId
  useAxios('DELETE', deleteUrl)
  golfBags.value = golfBags.value.filter(
    (golfBag) => golfBag.id !== golfBagId
  )
}
</script>

<template>
  <div class="flex flex-col">
    <GTNavButton :url="createUrl" class="border rounded-md border-black text-center w-1/5"
      >Add A New Bag</GTNavButton
    >
    <div v-if="golfBags" class="mt-2 space-y-2 w-1/5">
      <GTBagCard :key="golfBag.id" v-for="golfBag in golfBags" :golfBag @delete-golf-bag="handleDelete"></GTBagCard>
    </div>
  </div>
</template>

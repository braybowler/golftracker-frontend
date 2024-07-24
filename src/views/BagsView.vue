<script setup lang="ts">
import { useAxios } from '@/composables/useAxios'
import AddBagForm from '../forms/AddBagForm.vue'
import GTBagCard from '../components/cards/GTBagCard.vue'
import type { Ref } from 'vue'

const { requestData: golfBags }: { requestData: Ref } = useAxios('GET', 'golfbags')
</script>

<template>
  <div class="flex justify-between">
    <div v-if="golfBags" class="space-y-4">
      <ul :key="golfBag.id" v-for="golfBag in golfBags">
        <GTBagCard :golfBag></GTBagCard>
      </ul>
    </div>
    <AddBagForm></AddBagForm>
  </div>
</template>

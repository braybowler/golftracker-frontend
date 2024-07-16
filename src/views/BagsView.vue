<script setup lang="ts">
import { useAxios } from '@/composables/useAxios'
import AddBagForm from '../forms/AddBagForm.vue'
import GTBagCard from '../components/cards/GTBagCard.vue'

const { requestData: bags } = useAxios('GET', 'golfbags')
</script>

<template>
  <div class="flex justify-between">
    <div v-if="bags" class="space-y-4">
      <ul :key="bag.id" v-for="bag in bags">
        <GTBagCard :bag></GTBagCard>
      </ul>
    </div>
    <AddBagForm></AddBagForm>
  </div>
</template>

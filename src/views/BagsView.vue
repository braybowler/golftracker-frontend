<script setup lang="ts">
import { useAxios } from '@/composables/useAxios'
import AddGolfBagForm from '../forms/AddGolfBagForm.vue'
import GTGolfBagCard from '../components/cards/GTGolfBagCard.vue'

const { requestData: golfbags } = useAxios('GET', 'golfbags')
</script>

<template>
  <div class="flex justify-between">
    <div v-if="golfbags" class="space-y-4">
      <ul :key="golfbag.id" v-for="golfbag in golfbags">
        <GTGolfBagCard :golfbag></GTGolfBagCard>
      </ul>
    </div>
    <AddGolfBagForm></AddGolfBagForm>
  </div>
</template>

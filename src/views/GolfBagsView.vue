<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAxios } from '@/composables/useAxios'
import axios from 'axios'
import AddGolfBagForm from '../forms/AddGolfBagForm.vue'
import GTGolfBagCard from '../components/cards/GTGolfBagCard.vue'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const golfbags = ref([])

//TODO: Extract 'naked' axios request to a composable.
const fetchGolfBags = () => {
  const { requestData } = useAxios('GET', 'golfbags')
  console.log('destructured data', requestData.value)
  golfbags.value = requestData.value
}

onMounted(() => {
  fetchGolfBags()
})
</script>

<template>
  <div class="flex justify-between">
    <div class="space-y-4">
      <ul v-for="golfbag in golfbags">
        <GTGolfBagCard :golfbag></GTGolfBagCard>
      </ul>
    </div>
    <AddGolfBagForm></AddGolfBagForm>
  </div>
</template>

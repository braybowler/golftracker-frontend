<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AddGolfBagForm from '../forms/AddGolfBagForm.vue'
import GTGolfBagCard from '../components/cards/GTGolfBagCard.vue'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const golfbags = ref([])

//TODO: Extract 'naked' axios request to a useFetch composable.
const fetchGolfBags = () => {
  const fetchUrl = 'http://localhost/api/golfbags'
  axios
    .get(fetchUrl)
    .then(function (response) {
      console.log('response', response)
      //TODO: unwrap one 'data' key -> do this on the Laravel side when packaging up the resource.
      golfbags.value = response.data.data
    })
    .catch(function (error) {
      console.log('get request to api/golfbags, error: ', error)
    })
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

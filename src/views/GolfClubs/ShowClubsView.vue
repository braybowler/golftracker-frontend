<script setup lang="ts">
import { useAxios } from '@/composables/useAxios'
import { computed, onMounted, ref, unref } from 'vue'
import { useRoute } from 'vue-router'
import GTNavButton from '@/components/GTNavButton.vue'
import type { GolfClub } from '@/common/resources'

const route = useRoute()
const showUrl = computed(() => {
  return 'golfclubs/' + route.params.id
})

const golfClub = ref<GolfClub>()

const { requestMethodSelector } = useAxios()

onMounted(async () => {
  golfClub.value = await requestMethodSelector('GET', unref(showUrl))
})
</script>

<template>
  <div>
    <GTNavButton url="/golfclubs" class="border border-black rounded-md">Back to Clubs</GTNavButton>
    <div v-if="golfClub" class="mt-2">
      <p>Make: {{ golfClub.make }}</p>
      <p>Model: {{ golfClub.model }}</p>
      <p>Loft: {{ golfClub.loft }}&#176;</p>
      <p>Created: {{ golfClub.created_at }}</p>
      <p>Last Updated: {{ golfClub.updated_at }}</p>
    </div>
  </div>
</template>

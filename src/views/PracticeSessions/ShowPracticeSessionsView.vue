<script setup lang="ts">
import { useAxios } from '@/composables/useAxios'
import { computed, unref } from 'vue'
import { type Ref } from 'vue'
import { useRoute } from 'vue-router'
import GTNavButton from '@/components/GTNavButton.vue'

const route = useRoute()
const showUrl = computed(() => {
  return 'golfclubs/' + route.params.id
})

const { requestData: golfClub }: { requestData: Ref } = useAxios('GET', unref(showUrl))
</script>

<template>
  <div>
    <GTNavButton url="/golfclubs" class="border border-black rounded-md">Back to Clubs</GTNavButton>
    <div v-if="golfClub" class="mt-2">
      <p>Make: {{ golfClub.make }}</p>
      <p>Model: {{ golfClub.model }}</p>
      <p>Loft: {{ golfClub.loft }}&#176;</p>
      <p>Carry Distance: {{ golfClub.carry_distance }}</p>
      <p>Total Distance: {{ golfClub.total_distance }}</p>
      <p>Created: {{ golfClub.created_at }}</p>
      <p>Last Updated: {{ golfClub.updated_at }}</p>
    </div>
  </div>
</template>

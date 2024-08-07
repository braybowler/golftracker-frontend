<script setup lang="ts">
import { useAxios } from '@/composables/useAxios'
import { computed, unref } from 'vue'
import { type Ref } from 'vue'
import { useRoute } from 'vue-router'
import GTNavButton from '@/components/GTNavButton.vue'

const route = useRoute()
const showUrl = computed(() => {
  return 'golfballs/' + route.params.id
})

const { requestData: golfBall }: { requestData: Ref } = useAxios('GET', unref(showUrl))
</script>

<template>
  <div>
    <GTNavButton url="/golfballs" class="border border-black rounded-md"
      >Back to Golf Balls</GTNavButton
    >
    <div v-if="golfBall" class="mt-2">
      <p>Make: {{ golfBall.make }}</p>
      <p>Model: {{ golfBall.model }}</p>
      <p>Created: {{ golfBall.created_at }}</p>
      <p>Last Updated: {{ golfBall.updated_at }}</p>
    </div>
  </div>
</template>

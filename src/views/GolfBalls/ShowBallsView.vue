<script setup lang="ts">
import { useAxios } from '@/composables/useAxios'
import { computed, onMounted, ref, unref } from 'vue'
import { useRoute } from 'vue-router'
import GTNavButton from '@/components/GTNavButton.vue'
import type { GolfBall } from '@/common/resources'

const route = useRoute()
const showUrl = computed(() => {
  return 'golfballs/' + route.params.id
})

const golfBall = ref<GolfBall>()

const { requestMethodSelector } = useAxios()

onMounted(async () => {
  golfBall.value = await requestMethodSelector('GET', unref(showUrl))
})
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

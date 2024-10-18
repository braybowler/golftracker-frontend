<script setup lang="ts">
import { useAxios } from '@/composables/useAxios'
import { computed, onMounted, ref, unref } from 'vue'
import { useRoute } from 'vue-router'
import GTNavButton from '@/components/GTNavButton.vue'
import type { PracticeSession } from '@/common/resources'

const route = useRoute()
const showUrl = computed(() => {
  return 'practicesessions/' + route.params.id
})

const practiceSession = ref<PracticeSession>()

const { requestMethodSelector } = useAxios()

onMounted(async () => {
  practiceSession.value = await requestMethodSelector('GET', unref(showUrl))
})
</script>

<template>
  <div>
    <GTNavButton url="/golfclubs" class="border border-black rounded-md"
      >Back to Practice Sessions</GTNavButton
    >
    <div v-if="practiceSession" class="mt-2"></div>
  </div>
</template>

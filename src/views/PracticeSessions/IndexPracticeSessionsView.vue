<script setup lang="ts">
import { useAxios } from '@/composables/useAxios'
import { onMounted, ref } from 'vue'
import GTNavButton from '@/components/GTNavButton.vue'
import type { PracticeSession } from '@/common/resources'
import GTPracticeSessionCard from '@/components/cards/GTPracticeSessionCard.vue'

const createUrl = 'practicesessions/create'
const practiceSessions = ref<Array<PracticeSession>>([])

const { requestMethodSelector } = useAxios()

onMounted(async () => {
  practiceSessions.value = await requestMethodSelector('GET', 'practicesessions/')
})

function handleDelete(practiceSessionId: number) {
  const deleteUrl = 'practiceSessions/' + practiceSessionId
  requestMethodSelector('DELETE', deleteUrl)
  practiceSessions.value = practiceSessions.value.filter(
    (practiceSession: PracticeSession) => practiceSession.id !== practiceSessionId
  )
}
</script>

<template>
  <div class="flex flex-col">
    <GTNavButton :url="createUrl" class="border rounded-md border-black text-center w-1/5">
      Start a New Practice Session
    </GTNavButton>
    <div v-if="practiceSessions" class="mt-2 space-y-2 w-1/5">
      <GTPracticeSessionCard
        :key="practiceSession.id"
        v-for="practiceSession in practiceSessions"
        :practiceSession
        @delete-practice-session="handleDelete"
      ></GTPracticeSessionCard>
    </div>
  </div>
</template>

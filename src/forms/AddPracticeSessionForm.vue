<script setup lang="ts">
import { ref, unref } from 'vue'
import { useAxios } from '@/composables/useAxios'
import GTNavButton from '@/components/GTNavButton.vue'

const date = ref('')
const note = ref('')
const start_time = ref('')
const end_time = ref('')
const temperature = ref(0)
const wind_speed = ref(0)
const is_complete = ref(false)

const { requestMethodSelector } = useAxios()
const createPracticeSession = async () => {
  await requestMethodSelector('POST', 'golfballs', {
    date: unref(date),
    note: unref(note),
    start_time: unref(start_time),
    end_time: unref(end_time),
    temperature: unref(temperature),
    wind_speed: unref(wind_speed),
    is_complete: unref(is_complete)
  })
}
</script>

<template>
  <div class="flex flex-col">
    <div class="space-y-2">
      <p>GolfTracker was created to help you practice golf better.</p>
      <p>
        You're encouraged to select one of our pre-defined practice sessions to ensure you get the
        most out of your practice time.
      </p>
      <p>
        However, if none of the pre-defined options appeal to you, select 'Custom' to begin your own
        practice session.
      </p>
    </div>
    <div class="bg-secondary border border-black rounded-md flex flex-col mt-2 p-4 gap-2 w-full">
      <div class="flex flex-col justify-center">
        <GTNavButton
          @click="createPracticeSession()"
          url="/practicesessions"
          class="border border-black rounded-md text-center"
        >
          Start Practice Session
        </GTNavButton>
      </div>
    </div>
  </div>
</template>

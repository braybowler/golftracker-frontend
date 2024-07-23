<script setup lang="ts">
import { ref } from 'vue'
import { type GTResource } from '@/common'
import GTButton from '@/components/GTButton.vue'

defineProps<{
  resource: GTResource
}>()

const open = ref(false)
</script>

<template>
  <button @click="open = true" class="border border-black rounded-md hover:shadow-lg">
    Details
  </button>

  <Teleport to="body">
    <div
      v-if="open"
      class="fixed left-1/2 top-1/3 z-999 -ml-28 border w-70 h-60 border-black rounded-md bg-secondary p-2 space-y-4"
    >
      <div v-if="resource">
        <ul v-for="(value, key) in resource">
          <li>{{ key }}: {{ value }}</li>
        </ul>
      </div>
      <div class="flex flex-row justify-around">
        <GTButton @click="open = false" class="hover:text-white">Cancel</GTButton>
      </div>
    </div>
  </Teleport>
</template>

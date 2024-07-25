<script setup lang="ts">
import { type GolfClub } from '@/common'
import GTNavButton from "@/components/GTNavButton.vue";
import {computed} from "vue";

const props = defineProps<{
  golfClub: GolfClub
}>()

const showUrl = computed(() => {
  return '/golfclubs/' + props.golfClub.id
})
</script>

<template>
  <div class="border rounded-md border-black">
    <div class="flex flex-col justify-center p-2">
      <div class="flex flex-row justify-between p-2">
        <img src="../icons/GTImageNotFound.svg" alt="Image not found" class="h-20 w-20" />
        <div>
          <p>{{ props.golfClub.make }}</p>
          <p>{{ props.golfClub.model }}</p>
        </div>
      </div>
      <GTNavButton class="border rounded-md border-black text-center" :url=showUrl>Details</GTNavButton>
    </div>
  </div>
</template>

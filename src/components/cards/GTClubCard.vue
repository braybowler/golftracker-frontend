<script setup lang="ts">
import { type GolfClub } from "@/common";

const props = defineProps<{
  golfClub: GolfClub
}>()
</script>

<template>
  <div class="border rounded-md border-black shadow hover:shadow-lg">
    <div class="flex flex-row justify-between p-2">
      <img src="../icons/GTImageNotFound.svg" alt="Image not found" class="h-20 w-20" />
      <div>
        <p>{{ props.golfClub.make }}</p>
        <p>{{ props.golfClub.model }}</p>
      </div>
      <p>{{ props.golfClub.id }}</p>
    </div>
  </div>
</template>

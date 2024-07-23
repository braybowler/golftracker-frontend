<script setup lang="ts">
import { type GolfBag } from "@/common";
import GTResourceModal from "@/modals/GTResourceModal.vue";

const props = defineProps<{
  golfBag: GolfBag
}>()
</script>

<template>
  <div class="border rounded-md border-black">
    <div class="flex flex-col justify-center p-2">
    <div class="flex flex-row justify-between p-2">
      <img src="../icons/GTImageNotFound.svg" alt="Image not found" class="h-20 w-20" />
      <div>
        <p>{{ props.golfBag.make }}</p>
        <p>{{ props.golfBag.model }}</p>
        <p>{{ props.golfBag.nickname }}</p>
      </div>
    </div>
    <GTResourceModal :resource="golfBag"></GTResourceModal>
    </div>
  </div>
</template>

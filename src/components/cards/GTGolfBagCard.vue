<script setup lang="ts">
const props = defineProps<{
  golfbag: {}
}>()
</script>

<template>
  <div class="border rounded-md border-black shadow hover:shadow-lg">
    <div class="flex flex-row p-2">
      <img src="../icons/GTImageNotFound.svg" alt="Image not found" class="h-20 w-20 mr-2" />
      <div>
        <p>{{ props.golfbag.make }}</p>
        <p>{{ props.golfbag.model }}</p>
        <p>{{ props.golfbag.nickname }}</p>
      </div>
    </div>
  </div>
</template>

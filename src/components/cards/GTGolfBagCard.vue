<script setup lang="ts">
const props = defineProps<{
  golfbag: {}
}>()
</script>

<template>
  <div class="border rounded-md border-black shadow hover:shadow-lg">
    <div class="flex flex-row justify-between p-2">
      <img src="../icons/GTImageNotFound.svg" alt="Image not found" class="h-20 w-20" />
      <div>
        <p>{{ props.golfbag.make }}</p>
        <p>{{ props.golfbag.model }}</p>
        <p>{{ props.golfbag.nickname }}</p>
      </div>
      <p>{{ props.golfbag.id }}</p>
    </div>
  </div>
</template>

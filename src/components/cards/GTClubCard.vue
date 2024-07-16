<script setup lang="ts">
const props = defineProps<{
  bag: {}
}>()
</script>

<template>
  <div class="border rounded-md border-black shadow hover:shadow-lg">
    <div class="flex flex-row justify-between p-2">
      <img src="../icons/GTImageNotFound.svg" alt="Image not found" class="h-20 w-20" />
      <div>
        <p>{{ props.bag.make }}</p>
        <p>{{ props.bag.model }}</p>
        <p>{{ props.bag.nickname }}</p>
      </div>
      <p>{{ props.bag.id }}</p>
    </div>
  </div>
</template>

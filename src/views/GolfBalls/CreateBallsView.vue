<script setup lang="ts">
import AddBallForm from '@/forms/AddBallForm.vue'
import GTNavButton from '@/components/GTNavButton.vue'
</script>

<template>
  <div>
    <GTNavButton url="/golfballs" class="border border-black rounded-md"
      >Back to Golf Balls</GTNavButton
    >
    <div class="flex justify-center">
      <AddBallForm class="w-1/3"></AddBallForm>
    </div>
  </div>
</template>

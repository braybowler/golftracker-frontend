<script setup lang="ts">
import AddClubForm from '@/forms/AddClubForm.vue'
import GTNavButton from '@/components/GTNavButton.vue'
</script>

<template>
  <div>
    <GTNavButton url="/golfbags" class="border border-black rounded-md">Back to Clubs</GTNavButton>
    <div class="flex justify-center">
      <AddClubForm class="w-1/3"></AddClubForm>
    </div>
  </div>
</template>

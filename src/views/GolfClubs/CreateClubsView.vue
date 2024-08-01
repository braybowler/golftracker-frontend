<script setup lang="ts">
import AddClubForm from '@/forms/AddClubForm.vue'
import GTNavButton from '@/components/GTNavButton.vue'
</script>

<template>
  <div>
    <GTNavButton url="/golfclubs" class="border border-black rounded-md">Back to Clubs</GTNavButton>
    <div class="flex justify-center">
      <AddClubsForm class="w-1/3"></AddClubsForm>
    </div>
  </div>
</template>

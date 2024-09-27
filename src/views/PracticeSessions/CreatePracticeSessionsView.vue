<script setup lang="ts">
import GTNavButton from '@/components/GTNavButton.vue'
import AddPracticeSessionForm from '@/forms/AddPracticeSessionForm.vue'
</script>

<template>
  <div>
    <GTNavButton url="/practicesessions" class="border border-black rounded-md"
      >Back to Practice</GTNavButton
    >
    <div class="flex justify-center">
      <AddPracticeSessionForm class="w-1/3"></AddPracticeSessionForm>
    </div>
  </div>
</template>

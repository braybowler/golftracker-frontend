<script setup lang="ts">
import AddBagForm from "@/forms/AddBagForm.vue";
import GTNavButton from "@/components/GTNavButton.vue";
</script>

<template>
  <div>
    <GTNavButton url="/golfbags" class="border border-black rounded-md">Back to Bags</GTNavButton>
    <div class="flex justify-center">
      <AddBagForm class="w-1/3"></AddBagForm>
    </div>
  </div>
</template>

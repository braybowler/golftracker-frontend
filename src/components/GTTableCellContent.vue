<script setup lang="ts">
import type { GolfClub } from '@/common/resources'

const props = defineProps<{
  isInEditMode: boolean,
  golfClub: GolfClub,
  placeholder: String,
  targetSwingType: String,
  displayProperty: String,
}>()

</script>

<template>
  <template v-if="isInEditMode">
    <input type="number" placeholder="Enter carry" class="w-full" />
  </template>
  <template v-else>
    {{golfClub.yardages.find((item) => item.swing_type === targetSwingType)?.[displayProperty]}}
  </template>
</template>
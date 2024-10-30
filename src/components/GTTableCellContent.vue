<script setup lang="ts">
import type { GolfClub, Yardage } from '@/common/resources'

const props = defineProps<{
  isInEditMode: boolean
  golfClub: GolfClub
  placeholder: String
  targetSwingType: String
  displayProperty: String
}>()
</script>

<template>
  <template v-if="isInEditMode">
    <input
      type="number"
      :placeholder="
        props.golfClub.yardages.find((item: Yardage) => item.swing_type === targetSwingType)?.[
          displayProperty
        ]
      "
      class="w-full"
    />
  </template>
  <template v-else>
    {{
      props.golfClub.yardages.find((item: Yardage) => item.swing_type === targetSwingType)?.[
        displayProperty
      ]
    }}
  </template>
</template>

<script setup lang="ts">
import { useAxios } from '@/composables/useAxios'
import { computed, unref } from 'vue'
import { type Ref } from 'vue'
import { useRoute } from 'vue-router'
import GTEquipmentModal from '@/modals/GTEquipmentModal.vue'
import GTNavButton from '@/components/GTNavButton.vue'

const route = useRoute()
const showUrl = computed(() => {
  return 'golfbags/' + route.params.id
})

const { requestData: golfBag }: { requestData: Ref } = useAxios('GET', unref(showUrl))
</script>

<template>
  <div>
    <GTNavButton url="/golfbags" class="border border-black rounded-md">Back to Bags</GTNavButton>
    <div v-if="golfBag" class="mt-2">
      <p>Make: {{ golfBag.make }}</p>
      <p>Model: {{ golfBag.model }}</p>
      <p>Nickname: {{ golfBag.nickname }}</p>
      <p>Created: {{ golfBag.created_at }}</p>
      <p>Last Updated: {{ golfBag.updated_at }}</p>
    </div>
    <div v-if="golfBag" class="mt-2">
      <GTEquipmentModal :bag="golfBag"></GTEquipmentModal>
    </div>
  </div>
</template>

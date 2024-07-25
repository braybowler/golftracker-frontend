<script setup lang="ts">
import { useAxios } from '@/composables/useAxios'
import {computed, Ref, unref} from 'vue'
import {useRoute} from "vue-router";
import GTNavButton from "@/components/GTNavButton.vue";

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
      <p>{{ golfBag.make }}</p>
      <p>{{ golfBag.model }}</p>
      <p>{{ golfBag.nickname }}</p>
      <p>{{ golfBag.created_at }}</p>
      <p>{{ golfBag.updated_at }}</p>
    </div>
  </div>
</template>

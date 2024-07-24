<script setup lang="ts">
import { useAxios } from '@/composables/useAxios'
import {computed, Ref, unref} from 'vue'
import {useRoute} from "vue-router";

const route = useRoute()
const showUrl = computed(() => {
  return 'golfbags/' + route.params.id
})

const { requestData: golfBag }: { requestData: Ref } = useAxios('GET', unref(showUrl))
</script>

<template>
  <div v-if="golfBag">
    <p>{{ golfBag.make }}</p>
    <p>{{ golfBag.model }}</p>
    <p>{{ golfBag.nickname }}</p>
    <p>{{ golfBag.created_at }}</p>
    <p>{{ golfBag.updated_at }}</p>
  </div>
</template>

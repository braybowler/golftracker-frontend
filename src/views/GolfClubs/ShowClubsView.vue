<script setup lang="ts">
import { useAxios } from '@/composables/useAxios'
import {computed, Ref, unref} from 'vue'
import {useRoute} from "vue-router";

const route = useRoute()
const showUrl = computed(() => {
  return 'golfclubs/' + route.params.id
})

const { requestData: golfClub }: { requestData: Ref } = useAxios('GET', unref(showUrl))
</script>

<template>
  <div v-if="golfClub">
    <p>{{ golfClub.make }}</p>
    <p>{{ golfClub.model }}</p>
    <p>{{ golfClub.loft }}</p>
    <p>{{ golfClub.carry_distance }}</p>
    <p>{{ golfClub.total_distance }}</p>
  </div>
</template>

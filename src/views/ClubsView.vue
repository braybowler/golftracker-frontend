<script setup lang="ts">
import { useAxios } from '@/composables/useAxios'

const { requestData: clubs } = useAxios('GET', 'golfclubs')
</script>

<template>
  <div></div>
</template>

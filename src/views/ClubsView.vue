<script setup lang="ts">
import { useAxios } from '@/composables/useAxios'
import AddGolfBagForm from '../forms/AddBagForm.vue'
import GTGolfBagCard from '../components/cards/GTBagCard.vue'

const { requestData: clubs } = useAxios('GET', 'golfbags')
</script>

<template>
  <div></div>
</template>

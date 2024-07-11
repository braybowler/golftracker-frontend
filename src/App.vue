<script setup lang="ts">
import { RouterView } from 'vue-router'
import GTNavBar from './components/GTNavBar.vue'
import GTSideBar from './components/GTSideBar.vue'
</script>

<template>
  <GTNavBar></GTNavBar>
  <main class="flex flex-row">
    <GTSideBar></GTSideBar>
    <RouterView class="w-full" />
  </main>
</template>

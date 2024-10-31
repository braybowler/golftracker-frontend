<script setup lang="ts">
import { RouterView } from 'vue-router'
import GTNavBar from './components/GTNavBar.vue'
import GTSideBar from './components/GTSideBar.vue'
import GTBottomBar from '@/components/GTBottomBar.vue'
</script>

<template>
    <GTNavBar></GTNavBar>
    <main>
      <div class="flex flex-row">
        <GTSideBar></GTSideBar>
        <RouterView class="w-full p-4" />
      </div>
      <GTBottomBar></GTBottomBar>
    </main>
</template>

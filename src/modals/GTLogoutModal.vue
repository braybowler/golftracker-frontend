<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <button @click="open = true" class="hover:text-white">Logout</button>

  <Teleport to="body">
    <div v-if="open" class="modal border border-black rounded-md">
      <p>Hello from the modal!</p>
      <button @click="open = false" class="hover:text-white">Yes, Logout</button>
      <button @click="open = false" class="hover:text-white">No, Cancel</button>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>

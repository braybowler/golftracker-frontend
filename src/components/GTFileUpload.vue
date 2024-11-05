<script setup lang="ts">
import { ref } from 'vue'
import GTImageNotFound from '@/components/icons/GTImageNotFound.svg'

const selectedImage = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleImageSelection = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file && file.type.startsWith('image/')) {
    selectedImage.value = file;
    previewUrl.value = URL.createObjectURL(file)
  } else {
    alert('Please select a valid image file.')
  }
}

const uploadImage = async () => {
  if (!selectedImage.value) return

  try {
    //actually upload image to endpoint
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div>
    <input ref="fileInput" type="file" accept="image/*" @change="handleImageSelection" class="hidden"/>

    <button @click="triggerFileUpload">
      <img :src="previewUrl ? previewUrl : GTImageNotFound" alt="Golf Bag" class="h-20 w-20" />
    </button>
  </div>
</template>
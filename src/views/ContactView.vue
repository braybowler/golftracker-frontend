<script setup lang="ts">
import { ref } from 'vue'
import GTButton from '@/components/GTButton.vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitForm = () => {
  if (!form.value.name || !form.value.email || !form.value.subject || !form.value.message) {
    alert('Please fill out all of the fields before submitting your message.')
    return
  }

  form.value.name = ''
  form.value.email = ''
  form.value.subject = ''
  form.value.message = ''

  alert(
    'Thank you for contacting the GolfTracker team. You will hear back from us as soon as possible'
  )
}
</script>

<template>
  <div class="flex justify-center">
    <div>
      <p>Need to get in touch with the GolfTracker team? Here's the place to do it.</p>
      <p>Feel free to reach out with any questions, feedback, or suggestions.</p>

      <form @submit.prevent="submitForm">
        <div class="border border-black rounded-md bg-white w-full p-2 mt-2 space-y-2">
          <div class="flex flex-row justify-between">
            <label for="name">Name: </label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              placeholder="Enter your name"
              required
              class="border border-black rounded-md w-2/3"
            />
          </div>

          <div class="flex flex-row justify-between">
            <label for="email">Email: </label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              placeholder="Enter your email address"
              required
              class="border border-black rounded-md w-2/3"
            />
          </div>

          <div class="flex flex-row justify-between">
            <label for="subject">Subject: </label>
            <input
              type="text"
              id="subject"
              v-model="form.subject"
              placeholder="Enter the subject"
              required
              class="border border-black rounded-md w-2/3"
            />
          </div>

          <div class="flex flex-col">
            <label for="message">Message: </label>
            <textarea
              id="message"
              v-model="form.message"
              placeholder="Write your message here..."
              required
              class="border border-black rounded-md mt-2"
            ></textarea>
          </div>

          <div class="text-center">
            <GTButton type="submit">Send</GTButton>
          </div>
        </div>
      </form>

      <div class="mt-2">
        <h2>Alternate GolfTracker Contact Information</h2>
        <p><strong>Email: </strong> support@golftracker.ca</p>
      </div>
    </div>
  </div>
</template>

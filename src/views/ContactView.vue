<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const submitForm = () => {
  if (!form.value.name || !form.value.email || !form.value.subject || !form.value.message) {
    alert('Please fill out all of the fields before submitting your message.')
    return;
  }

  form.value.name = ''
  form.value.email = ''
  form.value.subject = ''
  form.value.message = ''

  alert('Thank you for contacting the GolfTracker team. You will hear back from us as soon as possible')
}

</script>

<template>
  <div>
    <h1>Contact Us</h1>
    <p>Need to get in touch with the GolfTracker team? Here's the place to do it.</p>
    <p>Feel free to reach out with any questions, feedback, or suggestions.</p>

    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name: </label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          placeholder="Enter your name"
          required
        />
      </div>

      <div>
        <label for="email">Email: </label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label for="subject">Subject: </label>
        <input
          type="text"
          id="subject"
          v-model="form.subject"
          placeholder="Enter the subject"
          required
        />
      </div>

      <div>
        <label for="message">Message: </label>
        <textarea
          id="message"
          v-model="form.message"
          placeholder="Write your message here..."
          required
        ></textarea>
      </div>

      <button type="submit">Send</button>
    </form>

    <div>
      <h2>GolfTracker Contact Information</h2>
      <p><strong>Email: </strong> support@golftracker.ca</p>
    </div>
  </div>
</template>

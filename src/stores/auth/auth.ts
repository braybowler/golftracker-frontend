import { defineStore } from 'pinia'
import { computed, ref, unref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { getCSRFToken, getMe, loginUser, logoutUser } from '@/stores/auth/api'

export const useAuth = defineStore('auth', () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const csrfUrl = import.meta.env.VITE_CSRF_URL
  const router = useRouter()
  const user = ref({})

  const register = async (name: string, email: string, password: string) => {
    try {
      await axios.get(csrfUrl)

      const response = await axios.post(baseUrl + 'register', {
        name: name,
        email: email,
        password: password
      })

      user.value = response.data.data ? response.data.data : response.data

      if (user.value) {
        await router.replace({ name: 'Dashboard' })
      }
    } catch (e) {
      console.error('Error when trying to register: ', e)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      await getCSRFToken()

      const response = await loginUser(email, password)

      user.value = response.data.data ? response.data.data : response.data
      await router.replace({ name: 'Dashboard' })

      if (user.value) {
        await router.replace({ name: 'Dashboard' })
      }
    } catch (e) {
      console.error('Error when trying to login: ', e)
    }
  }

  const logout = async () => {
    try {
      const response = await logoutUser()

      if (response.status === 204) {
        user.value = {}
        await router.replace({ name: 'Home' })
      }
    } catch (e) {
      console.error('Error when trying to logout: ', e)
    }
  }

  const isAuthed = computed(() => {
    return Object.keys(unref(user)).length != 0
  })

  const getUser = computed(() => {
    return user.value
  })

  const tryAuthOnce = async () => {
    try {
      const response = await getMe()

      user.value = response.data.data ? response.data.data : response.data
    } catch (e) {
      console.error('Error when trying to fetch from /me endpoint: ', e)
    }
  }

  return {
    register,
    login,
    logout,
    tryAuthOnce,
    isAuthed,
    getUser
  }
})

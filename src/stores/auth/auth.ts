import { defineStore } from 'pinia'
import { computed, ref, unref } from 'vue'
import { useAxios } from '@/composables/useAxios'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const useAuth = defineStore('auth', () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const csrfUrl = import.meta.env.VITE_CSRF_URL
  const router = useRouter();
  const user = ref({})

  const register = async (name: string, email: string, password: string) => {
    try {
      await axios.get(csrfUrl)

      const response = await axios
        .post(baseUrl + 'register', {
          name: name,
          email: email,
          password: password
        })

      user.value = response.data.data ? response.data.data : response.data
      await router.replace({ name: 'Dashboard' })
    } catch (e) {
      console.error('Error when trying to register: ',  e)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      await axios.get(csrfUrl)

      const response = await axios
        .post(baseUrl + 'login', {
          email: email,
          password: password
        })

      user.value = response.data.data ? response.data.data : response.data
      await router.replace({ name: 'Dashboard' })

    } catch (e) {
      console.error('Error when trying to login: ',  e)
    }
  }

  const logout = () => {
    useAxios('LOGOUT', 'logout', {})

    user.value = {}

    router.replace({ name: 'Home' })
  }

  const isAuthed = computed(() => {
    return Object.keys(unref(user)).length != 0
  })

  const getUser = computed(() => {
    return user.value
  })

  const tryAuthOnce = async () => {
    await axios
      .get(baseUrl + 'me')
      .then(async function (response) {
        user.value = response.data.data ? response.data.data : response.data
        console.log('tryAuthOnce', user.value)
      })
      .catch(function (error) {
        console.error('request to /me failed', error)
      })
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

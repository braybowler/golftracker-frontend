import { defineStore } from 'pinia'
import { computed, ref, unref } from 'vue'
import { useRouter } from 'vue-router'
import { useAxios } from '@/composables/useAxios'

export const useAuth = defineStore('auth', () => {
  const router = useRouter()
  const user = ref({})

  const register = async (name: string, email: string, password: string) => {
    try {
      const { requestMethodSelector } = useAxios()
      const response = requestMethodSelector('POST', 'register', {
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
      const { requestMethodSelector } = useAxios()
      const response = requestMethodSelector('GET', 'login', {
        email: email,
        password: password
      })

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
      const { requestMethodSelector } = useAxios()
      const response = requestMethodSelector('POST', 'logout')

      if (response.status === 204) {
        user.value = {}
        await router.replace({ name: 'Home' })
      }
    } catch (e) {
      console.error('Error when trying to logout: ', e)
    }
  }

  const isAuthed = computed(() => {
    return Object.keys(unref(getUser)).length != 0
  })

  const getUser = computed(() => unref(user))

  const tryAuthOnce = async () => {
    try {
      const { requestMethodSelector } = useAxios()
      const response = requestMethodSelector('GET', 'me')

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
    getUser,
    user
  }
})

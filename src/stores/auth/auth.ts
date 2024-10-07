import { defineStore } from 'pinia'
import { computed, ref, unref } from 'vue'
import { useRouter } from 'vue-router'
import { useAxios } from '@/composables/useAxios'

export const useAuth = defineStore('auth', () => {
  const router = useRouter()
  const user = ref({})

  const register = async (name: string, email: string, password: string) => {
    try {
      const { response, requestMethodSelector } = useAxios()
      await requestMethodSelector('POST', 'register', {
        name: name,
        email: email,
        password: password
      })

      user.value = response.value?.data?.data ? response.value.data.data : response.value?.data

      if (user.value) {
        await router.replace({ name: 'Dashboard' })
      }
    } catch (e) {
      console.error('Error when trying to register: ', e)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const { response, requestMethodSelector } = useAxios()
      await requestMethodSelector('POST', 'login', {
        email: email,
        password: password
      })

      user.value = response.value?.data?.data ? response.value.data.data : response.value?.data

      if (user.value) {
        await router.replace({ name: 'Dashboard' })
      }
    } catch (e) {
      console.error('Error when trying to login: ', e)
    }
  }

  const logout = async () => {
    try {
      const { response, requestMethodSelector } = useAxios()
      await requestMethodSelector('POST', 'logout')

      if (response.value?.status === 204) {
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
      const { response, requestMethodSelector } = useAxios()
      await requestMethodSelector('GET', 'me')

      user.value = response.value?.data?.data ? response.value.data.data : response.value?.data
      console.log(user.value)
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

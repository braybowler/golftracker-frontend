import { defineStore } from 'pinia'
import { computed, ref, unref } from 'vue'
import router from '@/router'
import { useAxios } from '@/composables/useAxios'

export const useAuth = defineStore('auth', () => {
  const user = ref({})

  const register = async (name: string, email: string, password: string) => {
    const {requestData: requestUser} = await useAxios('REGISTER', 'register', {
      name: name,
      email: email,
      password: password,
    })

    console.log(requestUser.value, 'requestUser')
    user.value = requestUser.value

    router.replace('/dashboard')
  }

  const login = (email: string, password: string) => {
    useAxios('LOGIN', 'login', {
      email: email,
      password: password,
    })

    router.replace('/dashboard')
  }

  const logout = () => {
    useAxios('LOGOUT', 'logout', {})

    router.replace('/')
  }

  const isAuthed = computed(() => {
    if (Object.keys(unref(user)).length != 0) {
      return true
    }

    return false
  })

  return {
    register,
    login,
    logout,
    isAuthed,
    user
  }
})

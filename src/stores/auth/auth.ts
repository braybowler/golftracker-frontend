import { defineStore } from 'pinia'
import { computed, ref, unref } from 'vue'
import router from '@/router'
import { useAxios } from '@/composables/useAxios'
import axios from 'axios'

export const useAuth = defineStore('auth', () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const user = ref({})

  if (sessionStorage.getItem('gt_user') && JSON.parse(sessionStorage.gt_user) != null) {
    user.value = JSON.parse(sessionStorage.gt_user)
  }

  const register = async (name: string, email: string, password: string) => {
    await axios
      .post(baseUrl + 'register', {
        name: name,
        email: email,
        password: password
      })
      .then(function (response) {
        user.value = response.data.data ? response.data.data : response.data
      })
      .catch(function (error) {
        console.log('REGISTER error: ', error)
      })

    sessionStorage.removeItem('gt_user')
    sessionStorage.setItem('gt_user', JSON.stringify(user.value))

    router.replace({ name: 'Dashboard' })
  }

  const login = async (email: string, password: string) => {
    await axios
      .post(baseUrl + 'login', {
        email: email,
        password: password
      })
      .then(function (response) {
        user.value = response.data.data ? response.data.data : response.data
      })
      .catch(function (error) {
        console.log('LOGIN error: ', error)
      })

    sessionStorage.removeItem('gt_user')
    sessionStorage.setItem('gt_user', JSON.stringify(user.value))

    router.replace({ name: 'Dashboard' })
  }

  const logout = () => {
    useAxios('LOGOUT', 'logout', {})

    user.value = {}
    sessionStorage.removeItem('gt_user')

    router.replace({ name: 'Home' })
  }

  const isAuthed = computed(() => {
    return Object.keys(unref(user)).length != 0
  })

  const getUser = computed(() => {
    return user.value
  })

  return {
    register,
    login,
    logout,
    isAuthed,
    getUser
  }
})

import { defineStore } from 'pinia'
import { computed, ref, unref } from 'vue'
import axios from 'axios'
import router from '@/router'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const baseUrl = import.meta.env.VITE_API_BASE_URL
const csrfUrl = import.meta.env.VITE_CSRF_URL

//TODO: Extract 'naked' axios requests to a useFetch composable.
export const useAuth = defineStore('auth', () => {
  const user = ref({})

  const register = (name: string, email: string, password: string) => {
    axios
      .get(csrfUrl)
      .then(function () {
        const registerUrl = baseUrl + 'register'
        axios
          .post(registerUrl, {
            name: name,
            password: password,
            email: email
          })
          .then(function (response) {
            user.value = response.data.user
            router.replace('/dashboard')
          })
          .catch(function (error) {
            console.log('post request to ' + registerUrl + ', error: ', error)
          })
      })
      .catch(function (error) {
        console.log('post request to sanctum/csrf-cookie, error: ', error)
      })
  }

  const login = (email: string, password: string) => {
    axios
      .get(csrfUrl)
      .then(function () {
        const loginUrl = baseUrl + 'login'
        axios
          .post(loginUrl, { email: email, password: password })
          .then(async function (response) {
            user.value = response.data.user
            router.replace('/dashboard')
          })
          .catch(function (error) {
            console.log('post request to ' + loginUrl + ', error: ', error)
          })
      })
      .catch(function (error) {
        console.log('post request to sanctum/csrf-cookie, error: ', error)
      })
  }

  const logout = () => {
    axios
      .get(csrfUrl)
      .then(function () {
        const logoutUrl = baseUrl + 'logout'
        axios
          .post(logoutUrl, {})
          .then(async function (response) {
            if (response.status === 204) {
              user.value = {}
              router.replace('/')
            }
          })
          .catch(function (error) {
            console.log('post request to ' + logoutUrl + ', error: ', error)
          })
      })
      .catch(function (error) {
        console.log('post request to sanctum/csrf-cookie, error: ', error)
      })
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

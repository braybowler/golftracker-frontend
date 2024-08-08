import { defineStore } from 'pinia'
import { computed, ref, unref } from 'vue'
import router from '@/router'
import { useAxios } from '@/composables/useAxios'

export const useAuth = defineStore('auth', () => {
  const user = ref({})

  if (sessionStorage.getItem('gt_user')) {
    user.value = JSON.parse(sessionStorage.gt_user)
  }

  const register = async (name: string, email: string, password: string) => {
    const { requestData: requestUser } = await useAxios('REGISTER', 'register', {
      name: name,
      email: email,
      password: password
    })

    user.value = requestUser.value
    sessionStorage.setItem('gt_user', JSON.stringify(user.value))


    router.replace({ name: 'Dashboard' })
  }

  const login = async (email: string, password: string) => {
    const { requestData: requestUser } = await useAxios('LOGIN', 'login', {
      email: email,
      password: password
    })

    user.value = requestUser.value
    sessionStorage.setItem('gt_user', JSON.stringify(user.value))

    router.replace({ name: 'Dashboard' })
  }

  const logout = () => {
    useAxios('LOGOUT', 'logout', {})

    user.value = {}
    sessionStorage.removeItem('gt_user')

    router.replace({name: 'Home'})
  }

  const isAuthed = computed(() => {
    return Object.keys(unref(user)).length != 0;
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

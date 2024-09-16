import { describe, test, vi, expect } from 'vitest'
import { useAuth } from '@/stores/auth/auth'
import router from '@/router'

const baseUrl = import.meta.env.VITE_API_BASE_URL

vi.mock('@/stores/auth/auth', async () => ({
  useAuth: vi.fn(() => ({
    register: vi.fn(),
    login: vi.fn(),
    logout: vi.fn()
  }))
}))

// vi.mock('@/router', async (importOriginal) => {
//   const original = await importOriginal() // type is inferred
//   return {
//     ...original,
//     // replace some exports
//     replace: vi.fn(),
//   }
// })

const guest = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password'
}

describe('Auth.ts', () => {

  describe('Register', () => {
    test('Registration requests are submitted to the registration endpoint', () => {
      const registrationEndpoint = baseUrl + 'register'
      const authStore = useAuth()
      authStore.register(guest.name, guest.email, guest.password);

      expect(authStore.register).toHaveBeenCalledWith(guest.name, guest.email, guest.password)
      expect(authStore.register).toHaveBeenCalledOnce()
    })

    test('A successful registration request routes a user to the dashboard', () => {
      const authStore = useAuth()
      authStore.register(guest.name, guest.email, guest.password);

      expect(router.replace).toHaveBeenCalledWith({name: 'Dashboard'})
      expect(router.currentRoute.value.name).toBe('Dashboard')
    })
  })

  describe('Login', () => {
    test('Login requests are submitted to the login endpoint', () => {
      const loginEndpoint = baseUrl + 'login'

      const authStore = useAuth()
      authStore.login(guest.email, guest.password);

      expect(authStore.login).toHaveBeenCalledWith(guest.email, guest.password)
    })
  })

  describe('Logout', () => {
    test('Logout requests are submitted to the logout endpoint', () => {
      const logoutEndpoint = baseUrl + 'logout'

      const authStore = useAuth()
      authStore.logout();

      expect(authStore.logout).toHaveBeenCalled()
    })
  })
})
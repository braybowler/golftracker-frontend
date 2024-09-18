import { describe, test, vi, expect, beforeEach, type Mock } from 'vitest'
import {useAuth} from '@/stores/auth/auth'
import axios from 'axios'
import { createPinia, setActivePinia } from 'pinia'
import { useRouter } from 'vue-router'

const csrfUrl = import.meta.env.VITE_CSRF_URL
const baseUrl = import.meta.env.VITE_API_BASE_URL

vi.mock('axios')
vi.mock('@/router', () => ({
  useRouter: vi.fn()
}));

const guest = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password'
}

describe('useAuth.ts', () => {

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('Register', () => {
    const registrationEndpoint = baseUrl + 'register';

    test('Registration requests make an initial request to the csrf endpoint', async () => {
      (axios.get as Mock).mockResolvedValueOnce({});

      const { register } = useAuth()
      await register(guest.name, guest.email, guest.password)

      expect(axios.get).toHaveBeenCalledWith(csrfUrl)
    })

    test('Registration requests are submitted to the registration endpoint', async () => {
      (axios.get as Mock).mockResolvedValueOnce({});
      const mockResponse = {
          user: {
            id: 1,
            name: 'test user',
            email: 'test@example.com',
            email_verified_at: null,
            last_active_at: null,
            created_at: '2024-09-08T17:28:16.000000Z',
            updated_at: '2024-09-08T17:28:16.000000Z'
          }
        };
      (axios.post as Mock).mockResolvedValueOnce(mockResponse);

      const { register } = useAuth()
      await register(guest.name, guest.email, guest.password)

      expect(axios.post).toHaveBeenCalledWith(
        registrationEndpoint,
        { name: guest.name, email: guest.email, password: guest.password }
      )
    })

    test.todo('A successful registration request routes a user to the dashboard', async () => {

    })

  })

  describe('Login', () => {

    test.todo('Login requests are submitted to the login endpoint', () => {
    })

  })

  describe('Logout', () => {

    test.todo('Logout requests are submitted to the logout endpoint', () => {
    })

  })

})
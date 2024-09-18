import { describe, test, vi, expect, beforeEach, type Mock } from 'vitest'
import {useAuth} from '@/stores/auth/auth'
import axios from 'axios'
import { createPinia, setActivePinia } from 'pinia'
import { useRouter } from 'vue-router'

const csrfUrl = import.meta.env.VITE_CSRF_URL
const baseUrl = import.meta.env.VITE_API_BASE_URL

vi.mock('axios')

vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  const mockReplace = vi.fn()

  return {
    ...actual,
    useRouter: ()=> {
      return {replace: mockReplace}
    }
  }
})

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
        data: {
          user: {
            id: 1,
            name: 'test user',
            email: 'test@example.com',
            email_verified_at: null,
            last_active_at: null,
            created_at: '2024-09-08T17:28:16.000000Z',
            updated_at: '2024-09-08T17:28:16.000000Z'
          }
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

    test('A successful registration request routes a user to the dashboard', async () => {
      (axios.get as Mock).mockResolvedValueOnce({});
      const mockResponse = {
        data: {
          user: {
            id: 1,
            name: 'test user',
            email: 'test@example.com',
            email_verified_at: null,
            last_active_at: null,
            created_at: '2024-09-08T17:28:16.000000Z',
            updated_at: '2024-09-08T17:28:16.000000Z'
          }
        }
      };
      (axios.post as Mock).mockResolvedValueOnce(mockResponse);

      const { register } = useAuth();

      await register(guest.name, guest.email, guest.password)

      expect(useRouter().replace).toHaveBeenCalledWith({ name: 'Dashboard' })
    })

    test.todo('An unsuccessful registration request keeps the user at the register page', async () => {
    })

  })

  describe('Login', () => {
    const loginEndpoint = baseUrl + 'login';

    test('Login requests make an initial request to the csrf endpoint', async () => {
      (axios.get as Mock).mockResolvedValueOnce({});

      const { login } = useAuth()
      await login(guest.email, guest.password)

      expect(axios.get).toHaveBeenCalledWith(csrfUrl)
    })

    test('Login requests are submitted to the login endpoint', async () => {
      (axios.get as Mock).mockResolvedValueOnce({});
      const mockResponse = {
        data: {
          user: {
            id: 1,
            name: 'test user',
            email: 'test@example.com',
            email_verified_at: null,
            last_active_at: null,
            created_at: '2024-09-08T17:28:16.000000Z',
            updated_at: '2024-09-08T17:28:16.000000Z'
          }
        }
      };
      (axios.post as Mock).mockResolvedValueOnce(mockResponse);

      const { login } = useAuth()
      await login(guest.email, guest.password)

      expect(axios.post).toHaveBeenCalledWith(
        loginEndpoint,
        { email: guest.email, password: guest.password }
      )
    })

    test('A successful login request routes a user to the dashboard', async () => {
      (axios.get as Mock).mockResolvedValueOnce({});
      const mockResponse = {
        data: {
          user: {
            id: 1,
            name: 'test user',
            email: 'test@example.com',
            email_verified_at: null,
            last_active_at: null,
            created_at: '2024-09-08T17:28:16.000000Z',
            updated_at: '2024-09-08T17:28:16.000000Z'
          }
        }
      };
      (axios.post as Mock).mockResolvedValueOnce(mockResponse);

      const { login } = useAuth();

      await login(guest.email, guest.password)

      expect(useRouter().replace).toHaveBeenCalledWith({ name: 'Dashboard' })
    })

    test.todo('An unsuccessful login request keeps the user at the register page', async () => {
    })

  })

  describe('Logout', () => {

    test.todo('Logout requests are submitted to the logout endpoint', () => {
    })

  })

  describe('TryAuthOnce', () => {

  })

})
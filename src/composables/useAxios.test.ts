import { afterEach, beforeEach, describe, expect, type Mock, test, vi } from 'vitest'
import { useAxios } from '@/composables/useAxios'
import axios from 'axios'
import { setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { throws } from 'assert'

const baseUrl = import.meta.env.VITE_API_BASE_URL

vi.mock('axios')
describe('useAxios.ts', () => {
  beforeEach(() => {
    setActivePinia(
      createTestingPinia({
        createSpy: vi.fn,
        stubActions: false
      }),
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const testEndpoint = baseUrl + 'test'

  describe('requestMethodSelector', () => {

    test('method routes calls with GET parameter to correct HTTP request type', async () => {
      const {requestMethodSelector} = useAxios()
// todo: fix this test with proper setup
      await requestMethodSelector("GET", 'test', {})

      expect(axios.get).toHaveBeenCalledWith(testEndpoint)
      expect(axios.post).not.toHaveBeenCalled()
      expect(axios.delete).not.toHaveBeenCalled()
    })

    test('method routes calls with POST parameter to correct HTTP request type', async () => {
      ;(axios.post as Mock).mockReturnValue({
        data: {
          data: {
            name: 'test'
            }
          }
        }
      )

      const {requestMethodSelector} = useAxios()

      await requestMethodSelector("POST", 'test', {})

      expect(axios.post).toHaveBeenCalledWith(testEndpoint, {})
      expect(axios.get).not.toHaveBeenCalled()
      expect(axios.delete).not.toHaveBeenCalled()
    })

    test('method routes calls with DELETE parameter to correct HTTP request type', async () => {
      const {requestMethodSelector} = useAxios()
// todo: fix this test with proper setup
      await requestMethodSelector("DELETE", 'test')

      expect(axios.delete).toHaveBeenCalledWith(testEndpoint)
      expect(axios.post).not.toHaveBeenCalled()
      expect(axios.get).not.toHaveBeenCalled()
    })

    test.each([
      { method: 'GET', functionCall: axios.get as Mock, expectedParams: [testEndpoint]},
      { method: 'POST', functionCall: axios.post as Mock, expectedParams: [testEndpoint, {}]},
      { method: 'DELETE', functionCall: axios.delete as Mock, expectedParams: [testEndpoint]}
    ])
    ('it will catch and re-throw error from request $method', async ({ method, functionCall, expectedParams }) => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => ({}))
      let thrownError = undefined
      functionCall.mockRejectedValue({
        status: 404
      })

      const {requestMethodSelector} = useAxios()

      try {
        await requestMethodSelector(method, 'test', {})
      } catch (e) {
        thrownError = e
      }


      expect(spy).toHaveBeenCalled()
      expect(functionCall).toHaveBeenCalledWith(...expectedParams)
      expect(thrownError).not.toBeUndefined()

      spy.mockReset()
    })

    test.todo('it makes a CSRF request if the XSRF_TOKEN is not present')
    test.todo('it does not make a CSRF request if the XSRF_TOKEN is present')
  })
})
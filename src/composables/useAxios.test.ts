import { afterEach, beforeEach, describe, expect, type Mock, test, vi } from 'vitest'
import { useAxios } from '@/composables/useAxios'
import axios from 'axios'
import { setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'

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

  describe('requestMethodSelector', () => {
    const testEndpoint = baseUrl + 'test'
    const csrfUrl = import.meta.env.VITE_CSRF_URL

    test('routes calls with GET parameter to correct HTTP request type', async () => {
      const spy = vi.spyOn(axios, 'get')
      const {requestMethodSelector} = useAxios()
      await requestMethodSelector("GET", 'test', {})

      expect(spy).toHaveBeenCalledWith(testEndpoint)
      expect(axios.post).not.toHaveBeenCalled()
      expect(axios.delete).not.toHaveBeenCalled()
      spy.mockReset()
    })

    test('routes calls with POST parameter to correct HTTP request type', async () => {
      const spy = vi.spyOn(axios, 'post')
      const {requestMethodSelector} = useAxios()
      await requestMethodSelector("POST", 'test', {})

      expect(spy).toHaveBeenCalledWith(testEndpoint, {})
      expect(axios.get).toHaveBeenCalledWith(csrfUrl)
      expect(axios.delete).not.toHaveBeenCalled()
      spy.mockReset()
    })

    test('routes calls with DELETE parameter to correct HTTP request type', async () => {
      const spy = vi.spyOn(axios, 'delete')
      const {requestMethodSelector} = useAxios()
      await requestMethodSelector("DELETE", 'test')

      expect(spy).toHaveBeenCalledWith(testEndpoint)
      expect(axios.post).not.toHaveBeenCalled()
      expect(axios.get).toHaveBeenCalledWith(csrfUrl)
      spy.mockReset()
    })

    test.each([
      { method: 'GET', functionCall: axios.get as Mock, expectedParams: [testEndpoint]},
      { method: 'POST', functionCall: axios.post as Mock, expectedParams: [testEndpoint, {}]},
      { method: 'DELETE', functionCall: axios.delete as Mock, expectedParams: [testEndpoint]}
    ])
    ('catches and re-throws error from request $method', async ({ method, functionCall, expectedParams }) => {
      const spy = vi.spyOn(console, 'error')
      if (method === 'GET') {
        functionCall.mockReturnValueOnce({}).mockRejectedValueOnce({
          status: 404
        })
      }

      functionCall.mockRejectedValue({
        status: 404
      })

      const {requestMethodSelector} = useAxios()
      await requestMethodSelector(method, 'test', {})

      expect(spy).toHaveBeenCalled()
      expect(functionCall).toHaveBeenCalledWith(...expectedParams)

      spy.mockReset()
    })

    describe('CSRF checks', () => {

      test('it makes a CSRF request if the XSRF_TOKEN is not present', async () => {
        const spy = vi.spyOn(axios, 'get')

        const {requestMethodSelector} = useAxios()
        await requestMethodSelector('GET', 'test', {})

        expect(spy).toHaveBeenCalledWith(csrfUrl)
        spy.mockReset()
      })

      test('it does not make a CSRF request if the XSRF_TOKEN is present', async () => {
        const spy = vi.spyOn(axios, 'get')
        //TODO: Setting document.cookie is not ideal.
        // This pollutes the test file for any subsequent tests.
        document.cookie = 'XSRF_TOKEN=Foobar'

        const {requestMethodSelector} = useAxios()
        await requestMethodSelector('GET', 'test', {})

        expect(spy).not.toHaveBeenCalledWith(csrfUrl)
        spy.mockReset()
      })
    })
  })
})
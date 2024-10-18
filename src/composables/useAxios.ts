import axios, { type AxiosResponse } from 'axios'
import { ref } from 'vue'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const baseUrl = import.meta.env.VITE_API_BASE_URL
const csrfUrl = import.meta.env.VITE_CSRF_URL

export function useAxios() {
  const response = ref<AxiosResponse>()

  async function requestMethodSelector(method: string, requestUrl: string, body?: {}) {
    const fullUrl = baseUrl + requestUrl

    if (!isCsrfCookieSet()) {
      await axios.get(csrfUrl)
    }

    try {
      switch (method) {
        case 'DELETE':
          response.value = await axios.delete(fullUrl)
          break
        case 'GET':
          response.value = await axios.get(fullUrl)
          break
        case 'POST':
          response.value = await axios.post(fullUrl, body)
          break
      }

      return response.value?.data.data ? response.value?.data.data : response.value?.data

    } catch (e) {
      console.error(`Error with ${method} request: `, e)
    }
  }

  function isCsrfCookieSet() {
    const csrfCookieIndex = document.cookie.indexOf('XSRF_TOKEN')
    return csrfCookieIndex != -1
  }

  return {
    requestMethodSelector,
    response
  }
}

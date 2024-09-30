import { ref } from 'vue'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const baseUrl = import.meta.env.VITE_API_BASE_URL
const csrfUrl = import.meta.env.VITE_CSRF_URL

export function useAxios() {
  // const requestData = ref(null)
  // const requestError = ref(null)
  // const fullUrl = baseUrl + requestUrl

  async function requestMethodSelector(method: string, requestUrl: string, body?: {}) {
    const fullUrl = baseUrl + requestUrl;

    if (!checkCsrfCookie()) {
      await axios.get(csrfUrl)
    }

    let response = undefined;

    try {
        switch (method) {
          case 'DELETE':
              response = await axios.delete(fullUrl)
            break
          case 'GET':
              response = await axios.get(fullUrl)
            break
          case 'POST':
              response = await axios.post(fullUrl, body)
            break
        }

      return response?.data.data ? response.data.data : response.data
    } catch (e) {
      console.error('Error with POST request: ', e)
      throw e
    }
  }

  function checkCsrfCookie() {
      console.log('checking cookie')
     return document.cookie.indexOf('XSRF_TOKEN')
  }

  return {
    requestMethodSelector
  }
}

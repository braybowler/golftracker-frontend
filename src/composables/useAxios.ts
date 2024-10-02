import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const baseUrl = import.meta.env.VITE_API_BASE_URL
const csrfUrl = import.meta.env.VITE_CSRF_URL

export function useAxios() {
  async function requestMethodSelector(method: string, requestUrl: string, body?: {}) {
    const fullUrl = baseUrl + requestUrl;

    if (!isCsrfCookieSet()) {
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

      return response?.data.data ? response?.data.data : response?.data
    } catch (e) {
      console.error(`Error with ${method} request: `, e)
    }
  }

  function isCsrfCookieSet() {
    const csrfCookieIndex = document.cookie.indexOf('XSRF_TOKEN')
    return csrfCookieIndex != -1;
  }

  return {
    requestMethodSelector,
  }
}

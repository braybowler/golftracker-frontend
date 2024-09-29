import { ref } from 'vue'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const baseUrl = import.meta.env.VITE_API_BASE_URL

export async function useAxios(method: string, requestUrl: string, body?: {}) {
  const requestData = ref(null)
  const requestError = ref(null)
  const fullUrl = baseUrl + requestUrl

  switch (method) {
    case 'DELETE':
      axios
        .delete(fullUrl)
        .then(function(response) {
          console.log(response)
          requestData.value = response.data.data ? response.data.data : response.data
        })
        .catch(function(error) {
          console.log('DELETE error: ', error)
          requestError.value = error
        })
      break
    case 'GET':
      try {
        const response = await axios.get(fullUrl)
        requestData.value = response.data.data ? response.data.data : response.data
      } catch (e) {
        console.log('GET error: ', e)
        requestError.value = e
      }
      break
    case 'POST':
      axios
        .post(fullUrl, body)
        .then(function(response) {
          console.log(response)
          requestData.value = response.data.data
        })
        .catch(function(error) {
          console.log('POST error: ', error)
          requestError.value = error
        })
      break
    //Only invoked by the useAuth store in src/stores/auth/auth.ts
    case 'LOGOUT':
      axios
        .post(fullUrl, body)
        .then(function(response) {
          if (response.status === 204) {
            console.log(response)
            requestData.value = response.data.data ? response.data.data : response.data
          }
        })
        .catch(function(error) {
          console.log('LOGOUT error: ', error)
          requestError.value = error
        })
      break
  }


  return {
    requestData,
    requestError
  }
}

import { ref } from 'vue'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const baseUrl = import.meta.env.VITE_API_BASE_URL
const csrfUrl = import.meta.env.VITE_CSRF_URL

export function useAxios(method: string, requestUrl: string, body?: {}) {
  const requestData = ref(null)
  const requestError = ref(null)
  const fullUrl = baseUrl + requestUrl

  switch (method) {
    case 'DELETE':
      axios
        .delete(fullUrl)
        .then(function (response) {
          requestData.value = response.data.data ? response.data.data : response.data
        })
        .catch(function (error) {
          console.log('DELETE error: ', error)
          requestError.value = error
        })
      break
    case 'GET':
      axios
        .get(csrfUrl)
        .then(function () {
          axios
            .get(fullUrl)
            .then(function (response) {
              //TODO : This is here to support a single resource being returned (i.e. a request to a show action). Do this better.
              requestData.value = response.data.data ? response.data.data : response.data
            })
            .catch(function (error) {
              console.log('GET error: ', error)
              requestError.value = error
            })
        })
        .catch(function (error) {
          console.log(method + ' request to sanctum/csrf-cookie, error: ', error)
        })
      break
    case 'POST':
      axios
        .get(csrfUrl)
        .then(function () {
          axios
            .post(fullUrl, body)
            .then(function (response) {
              requestData.value = response.data.data
            })
            .catch(function (error) {
              console.log('POST error: ', error)
              requestError.value = error
            })
        })
        .catch(function (error) {
          console.log(method + ' request to sanctum/csrf-cookie, error: ', error)
        })
      break
  }

  return {
    requestData,
    requestError
  }
}

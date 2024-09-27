import axios from 'axios'


export const logoutUser = async () => {
  return axios.post(baseUrl + 'logout')
}

export const loginUser = async (email: string, password) => {
  return axios.post(baseUrl + 'login', { email, password })
}

export const getMe = async () => {
  return axios.get(baseUrl + 'me')
}

export const getCSRFToken = async () => {
  return axios.get(csrfUrl)
}

export default {
  logoutUser,
  loginUser,
  getMe
}
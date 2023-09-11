import http from '@/http-common'

export const loginApi = async (userData) => {
  return await http.post('/api/user/login', userData)
}

export const logoutApi = async () => {
  return await http.post('/api/user/logout')
}
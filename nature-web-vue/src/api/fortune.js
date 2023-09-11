import http from '@/http-common'

export const getFortuneApi = async (data) => {
  return await http.post('/api/fortune', data, {
    timeout: 180 * 1000
  })
}
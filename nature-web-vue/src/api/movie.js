import http from '@/http-common'

export const getMoviesApi = async (page) => {
  return await http.get('/api/movie/popular-movies', { params: { page: page } })
}

export const getMovieApi = async (id) => {
  return await http.get(`/api/movie/${id}`)
}

export const getReviewApi = async (title) => {
  return await http.post('/api/movie/review', { title: title }, {
    timeout: 180 * 1000,
  })
}

export const getMovieVideosApi = async (id) => {
  return await http.get(`/api/movie/videos/${id}`)
}
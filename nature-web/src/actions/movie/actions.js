import http from "../../app/http-common"
import { movieActions } from "../../reducers/movieSlice";

const getMovies = (page) => {
  return async (dispatch, getState) => {
    const res = await http.get('/movie/popular-movies', { params: { page: page } })
      .catch(err => { console.log(err); throw err })
    console.log('xxx', res);
    const movies = res.data
    dispatch(movieActions.getMovies({ movies, page }))
  }
}
const getMovie = (id) => {
  return async (dispatch, getState) => {
    const res = await http.get(`/movie/${id}`)
      .catch(err => { console.log(err); throw err })

    const movie = res.data
    dispatch(movieActions.getMovie({ movie }))
    // return movie
  }
}
const getMovieReview = async (req) => {

  const res = await http.post('/movie/review', req, {
    timeout: 180 * 1000
  })
    .catch(err => { console.log(err); throw err })
  console.log('response ', res.data)
  return res.data
}
const initMovie = () => {
  return async (dispatch, getState) => {
    dispatch(movieActions.initMovie())
    // return movie
  }
}
const movieAction = {
  getMovies,
  getMovie,
  getMovieReview,
  initMovie
}
export default movieAction
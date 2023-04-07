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
    console.log('xxx', res);
    const movie = res.data
    dispatch(movieActions.getMovie({ movie }))
  }
}
const movieAction = {
  getMovies,
  getMovie
}
export default movieAction
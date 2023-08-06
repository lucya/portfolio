import { Dispatch } from "react";
import http from "../../app/http-common"
import { movieActions } from "../../reducers/movieSlice";

const getMovies = (page: number) => {
  return async (dispatch: Dispatch<any>) => {
    const res = await http.get('/movie/popular-movies', { params: { page: page } })
      .catch((err: Error) => { console.log(err); throw err })

    const movies = res.data
    dispatch(movieActions.getMovies({ movies, page }))
  }

}
const getMovie = (id: number) => {
  return async (dispatch: Dispatch<any>) => {
    const res = await http.get(`/movie/${id}`)
      .catch((err: Error) => { console.log(err); throw err })

    const movie = res.data
    dispatch(movieActions.getMovie({ movie }))
  }
}

const getMovieVideos = (id: number) => {
  return async (dispatch: Dispatch<any>) => {
    const res = await http.get(`/movie/videos/${id}`)
      .catch((err: Error) => { console.log(err); throw err })
    console.log('getMovieVideos', res.data)
    const videos = res.data
    dispatch(movieActions.getMovieVideos({ videos }))
  }
}

const getMovieReview = async (title: string) => {

  const res = await http.post('/movie/review', { title: title }, {
    timeout: 180 * 1000
  })
    .catch((err: Error) => { console.log(err); throw err })
  console.log('response ', res.data)
  return res.data
}
const initMovie = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch(movieActions.initMovie())
    // return movie
  }
}
const movieAction = {
  getMovies,
  getMovie,
  getMovieReview,
  initMovie,
  getMovieVideos
}
export default movieAction
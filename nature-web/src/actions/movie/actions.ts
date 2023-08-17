import { Dispatch } from "react";
import http from "../../app/http-common"
import { movieActions } from "../../reducers/movieSlice";

const getMovies = (page: number) => {
  return async (dispatch: Dispatch<any>) => {
    await http.get('/movie/popular-movies', { params: { page: page } })
      .then(({ data }) => {
        let movies = data;
        dispatch(movieActions.getMovies({ movies, page }))
      })
      .catch((err: Error) => { console.log(err); throw err })
  }

}
const getMovie = (id: number) => {
  return async (dispatch: Dispatch<any>) => {
    await http.get(`/movie/${id}`)
      .then(({ data }) => {
        const movie = data
        dispatch(movieActions.getMovie({ movie }))
      })
      .catch((err: Error) => { console.log(err); throw err })
  }
}

const getMovieVideos = (id: number) => {
  return async (dispatch: Dispatch<any>) => {
    await http.get(`/movie/videos/${id}`)
      .then(({ data }) => {
        const videos = data
        dispatch(movieActions.getMovieVideos({ videos }))
      })
      .catch((err: Error) => { console.log(err); throw err })
  }
}

const getMovieReview = async (title: string) => {
  return await http.post('/movie/review', { title: title }, {
    timeout: 180 * 1000
  })
    .then(({ data }) => {
      return data;
    })
    .catch((error: Error) => { console.log(error); throw error })
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
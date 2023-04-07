import { createSlice } from '@reduxjs/toolkit';
import { Movie } from '../actions/movie/types';

const initialState = {
  movies: [],
  movie: Movie,
  page: 1
}
const movieSlice = createSlice({
  name: 'movie',
  initialState: initialState,
  reducers: {
    //...state와 자동 return
    getMovies: (state, action) => {
      const { movies, page } = action.payload
      state.movies = page === 1 ? movies : [...state.movies, ...movies]
      state.page = page
      state.movie = Movie
    },
    getMovie: (state, action) => {
      const { movie } = action.payload
      console.log('Movie', movie)
      state.movie = movie
    }
  }
})
export const movieActions = movieSlice.actions
export default movieSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import { Movie } from '../actions/movie/types';
import { PURGE } from "redux-persist";


const initialState = {
  movies: [],
  movie: Movie,
  page: 0
}
const movieSlice = createSlice({
  name: 'movie',
  initialState: initialState,
  reducers: {
    //...state와 자동 return
    getMovies: (state, action) => {
      const { movies, page } = action.payload
      state.movies = [...state.movies, ...movies]
      state.page = page
      state.movie = Movie
    },
    getMovie: (state, action) => {
      const { movie } = action.payload
      console.log('Movie', movie)
      state.movie = movie
    },
    initMovie: (state, action) => {
      state.movie = Movie
    },
  },
  //초기화하고 싶은 state가 있는 slice마다 아래를 추가해야한다.
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  }
})
export const movieActions = movieSlice.actions
export default movieSlice.reducer;
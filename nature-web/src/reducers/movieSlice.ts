import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieType } from '../actions/movie/types';
import { PURGE } from "redux-persist";

interface MovieState {
  movies?: Array<MovieType> | undefined;
  movie?: MovieType | null | undefined;
  page?: number;
}

const initialState: MovieState = {
  movies: [],
  movie: null,
  page: 1
}
const movieSlice = createSlice({
  name: 'movie',
  initialState: initialState,
  reducers: {
    //...state와 자동 return
    getMovies: (state, action: PayloadAction<MovieState>) => {
      const { movies, page } = action.payload
      state.movies = [...state.movies as [], ...movies as []]
      state.page = page
      state.movie = Movie
    },
    getMovie: (state, action: PayloadAction<MovieState>) => {
      const { movie } = action.payload
      console.log('Movie', movie)
      state.movie = movie
    },
    initMovie: (state, action: PayloadAction) => {
      state.movie = Movie
    },
  },
  //초기화하고 싶은 state가 있는 slice마다 아래를 추가해야한다.
  extraReducers: (builder: any) => {
    builder.addCase(PURGE, () => initialState);
  }
})
export const movieActions = movieSlice.actions
export default movieSlice.reducer;
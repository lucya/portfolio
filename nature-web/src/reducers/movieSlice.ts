import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieType, MovieVideoType } from '../actions/movie/types';
import { PURGE } from "redux-persist";
import { RootState } from '../app/store';

interface MovieState {
  movies?: Array<MovieType> | undefined;
  movie?: MovieType | null | undefined;
  page?: number;
  videos?: Array<MovieVideoType> | undefined;
}

const initialState: MovieState = {
  movies: [],
  movie: null,
  page: 1,
  videos: [],
}
const movieSlice = createSlice({
  name: 'movie',
  initialState: initialState,
  reducers: {
    //...state와 자동 return
    getMovies: (state, action: PayloadAction<MovieState>) => {
      let { movies, page } = action.payload
      if (!movies || !movies.length) {
        movies = [];
      }
      state.movies = [...state.movies as [], ...movies as []]
      state.page = page
      state.movie = Movie
    },
    getMovie: (state, action: PayloadAction<MovieState>) => {
      const { movie } = action.payload
      console.log('Movie', movie)
      state.movie = movie
    },
    getMovieVideos: (state, action: PayloadAction<MovieState>) => {
      const { videos } = action.payload
      state.videos = videos
    },
    initMovie: (state, action: PayloadAction) => {
      state.movie = Movie
      state.videos = []
    },
  },
  //초기화하고 싶은 state가 있는 slice마다 아래를 추가해야한다.
  extraReducers: (builder: any) => {
    builder.addCase(PURGE, () => initialState);
  }
})

export const movieActions = movieSlice.actions
export default movieSlice.reducer;
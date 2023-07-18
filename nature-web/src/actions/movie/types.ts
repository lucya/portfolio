export type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genres: number[] | [];
  id: number;
  // original_language: string;
  // original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime: number;
  tagline: string;
}

export type MovieVideoType = {
  key: string;
  type: string;
}

export const Movie: MovieType = {
  adult: false,
  backdrop_path: '',
  genres: [],
  id: 0,
  overview: '',
  popularity: 0,
  poster_path: '',
  release_date: '',
  title: '',
  video: false,
  vote_average: 0,
  vote_count: 0,
  runtime: 0,
  tagline: '',
}
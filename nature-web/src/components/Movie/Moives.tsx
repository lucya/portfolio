import React, { useEffect } from "react"
import movieAction from '../../actions/movie/actions'

import Movie from "./Movie";
import { useAppSelector, useAppDispatch } from '../../app/hooks'

import Loading from "../../app/pages/Loading";
import ScrollToTop from "../../app/utils/ScrollToTop";
import { MovieType } from "../../actions/movie/types";
// import { movieSelector } from "../../reducers/movieSlice";

const Movies: React.FC = () => {
  let { movies, page } = useAppSelector((state) => state.movieReducer)
  const dispatch = useAppDispatch()
  const getMovies = (page?: number) => {
    console.log("getMovies")
    page = page || 1
    dispatch(movieAction.getMovies(Number(page)))
  }
  const handleMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    getMovies(Number(page) + 1);
  }

  useEffect(() => {
    dispatch(movieAction.initMovie())
  }, [])

  useEffect(() => {
    // 목록이 있는 경우 재호출 금지
    if (movies && movies.length) return;
    getMovies()
  }, [movies, dispatch])

  if (!movies || movies.length === 0) {
    return <Loading />
  }

  return (
    <>
      <ScrollToTop stay />
      <div className='movie-container'>
        {movies?.map((movie: MovieType) => {
          return (
            <Movie
              key={movie.id}
              movie={movie}
            />
          );
        })}
      </div>
      <div className="movie-more">
        <button onClick={handleMore}>More</button>
      </div>

    </>
  )
}
export default Movies;
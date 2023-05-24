import React, { useEffect } from "react"
import movieAction from '../../actions/movie/actions'

import Movie from "./Movie";
import { useAppSelector, useAppDispatch } from '../../app/hooks'

import Loading from "../../app/pages/Loading";
import ScrollToTop from "../../app/utils/ScrollToTop";
import { MovieType } from "../../actions/movie/types";

const Movies: React.FC = () => {
  const { movies, page } = useAppSelector((state) => state.movieReducer)
  const dispatch = useAppDispatch() //useDispatch();

  const getMovies = () => {
    console.log("getMovies")
    dispatch(movieAction.getMovies(page || 0 + 1))
  }
  const handleMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    getMovies();
  }

  useEffect(() => {
    dispatch(movieAction.initMovie())
  }, [])

  useEffect(() => {
    // !page && getMovies()
    // if (!page) {
    getMovies()
    // }
  }, [])

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
import React, { useEffect, useState } from "react";
import movieAction from '../../actions/movie/actions';

import Movie from "./Movie";
import { useDispatch, useSelector } from "react-redux";


function Movies() {
  const [page, setPage] = useState(1)
  const [upActive, setUpActive] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector(state => state.movieReducer)
  console.log('dddd', data)
  const movies = data.movies;
  console.log(movies);
  // setPage(data.page);

  const getMovies = () => {
    setPage(page + 1)
    dispatch(movieAction.getMovies(page))
  }
  const handleMore = (e) => {
    e.preventDefault();
    getMovies();
  }
  const handleGoup = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    setPage(1)
    getMovies()

    const watch = () => {
      const handleUpActive = () => {
        (window.scrollY > 500) ? setUpActive(true) : setUpActive(false);
      }

      window.addEventListener("scroll", handleUpActive)
      return () => {
        window.removeEventListener("scroll", handleUpActive)
      }
    }
    watch();
  }, [])
  return (
    <>
      <div className='movie-container'>
        {movies?.map((movie) => {
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
      <div className={upActive ? 'goup active' : 'goup'} onClick={handleGoup}>🔝</div>
    </>
  )
}
export default Movies;
import React, { useEffect, useRef, useState } from "react";
import movieAction from '../../actions/movie/actions';

import Movie from "./Movie";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../app/pages/Loading";


function Movies() {
  const [upActive, setUpActive] = useState(false);
  const moviesRef = useRef();
  const dispatch = useDispatch();
  const { movies, page } = useSelector(state => state.movieReducer)

  // console.log(movies);

  const getMovies = () => {
    dispatch(movieAction.getMovies(page + 1))
  }
  const handleMore = (e) => {
    e.preventDefault();
    getMovies();
  }
  const handleGoup = (e) => {
    e.preventDefault();
    moviesRef.current.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }
  const handleScroll = (e) => {
    (e.currentTarget.scrollTop > 500) ? setUpActive(true) : setUpActive(false);
  };
  useEffect(() => {
    dispatch(movieAction.initMovie())
  }, [])
  useEffect(() => {
    !page && getMovies()
  }, [])

  useEffect(() => {
    if (localStorage.getItem('movies-scrollY')) {
      moviesRef.current.scrollTop = localStorage.getItem('movies-scrollY');
      localStorage.removeItem('movies-scrollY');
    }
  }, [])
  if (!movies || movies.length === 0) {
    return <Loading />
  }
  return (
    <div className="movie-container-wrap" ref={moviesRef} onScroll={handleScroll}>
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
    </div>
  )
}
export default Movies;
import React, { useEffect, useRef, useState } from "react";
import movieAction from '../../actions/movie/actions';

import Movie from "./Movie";
import { useDispatch, useSelector } from "react-redux";


function Movies() {
  const [page, setPage] = useState(1)
  const [upActive, setUpActive] = useState(false);
  const moviesRef = useRef();
  const dispatch = useDispatch();
  const data = useSelector(state => state.movieReducer)

  const movies = data.movies;
  // console.log(movies);
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
    moviesRef.current.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }
  const handleScroll = (e) => {
    console.log(e.currentTarget.scrollTop);
    //let scrollArea = e.currentTarget
    (e.currentTarget.scrollTop > 500) ? setUpActive(true) : setUpActive(false);
  };

  useEffect(() => {
    setPage(1)
    getMovies()

    if (localStorage.getItem('movies-scrollY')) {
      moviesRef.current.scrollTop = localStorage.getItem('movies-scrollY');
      localStorage.removeItem('movies-scrollY');
    }
  }, [])
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
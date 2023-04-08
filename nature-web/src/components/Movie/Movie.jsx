import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IMG_BASE_URL } from "../../containers/Movie/Movie";


function Movie({ movie }) {
  const handleSaveScroll = () => {
    localStorage.setItem('movies-scrollY', document.querySelector('.movie-container-wrap').scrollTop)
  }
  return (
    <div className='movie-wrap'>
      <Link to={`/movie/${movie.id}`} onClick={handleSaveScroll}>
        <img src={IMG_BASE_URL + movie.poster_path} alt={movie.title} />
      </Link>
      <div className='movie-info'>
        <h4>{movie.title}</h4>
        <span className="overview"></span>
        <span>{movie.vote_average}</span>
      </div>
    </div>
  );
}
export default Movie;
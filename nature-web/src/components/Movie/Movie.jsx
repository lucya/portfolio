import React, { memo } from "react";
import { Link } from "react-router-dom";
import { IMG_BASE_URL } from "../../containers/Movie/Movie";
import * as config from '../../app/config';

function Movie({ movie }) {

  const handleSaveScroll = () => {
    localStorage.setItem(config.SET_SCROLLY, document.querySelector('.App').children[0].scrollTop)
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
export default memo(Movie);
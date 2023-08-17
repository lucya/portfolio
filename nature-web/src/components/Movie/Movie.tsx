import React, { memo } from "react";
import { Link } from "react-router-dom";
import * as config from '../../app/config';
import { MovieType } from "../../actions/movie/types";

interface OwnProps {
  movie: MovieType;
}
const Movie: React.FC<OwnProps> = ({ movie }) => {
  // function Movie({ movie }: OwnProps) {

  const handleSaveScroll = () => {
    const elm = document.querySelector('.main-container');
    sessionStorage.setItem(config.SET_SCROLLY, elm?.scrollTop + "")
  }
  return (
    <div className='movie-wrap'>
      <Link to={`/movie/${movie.id}`} onClick={handleSaveScroll}>
        <img src={config.IMG_BASE_URL + movie.poster_path} alt={movie.title} />
      </Link>
      <div className='movie-info'>
        <h4>{movie.title}</h4>
        <span className="overview">{movie.release_date}</span>
        <span>평점 : {movie.vote_average}</span>
      </div>
    </div>
  );
}
export default memo(Movie);
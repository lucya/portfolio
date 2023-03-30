import React from "react";
import { Link } from "react-router-dom";
import { IMG_BASE_URL } from "../../containers/Movie/Movie";


function MovieItem(props) {

  return (
    <div className='movie-container'>
      <Link to={`/movie/${props.id}`} state={props}>
        <img src={IMG_BASE_URL + props.poster_path} alt={props.title} />
      </Link>
      <div className='movie-info'>
        <h4>{props.title}</h4>
        <span>{props.vote_average}</span>
      </div>
    </div>
  );
}
export default MovieItem;
import React from "react";
import { Link } from "react-router-dom";
import { dummy } from "../../movieDummy";
import MovieItem from "./MovieItem";


function Movies() {
  return (
    <div className='movies-container'>
      {dummy.results.map((movie) => {
        return (

          <MovieItem
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            vote_average={movie.vote_average}
          />
        );
      })}
    </div>
  )
}
export default Movies;
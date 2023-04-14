import { Route, Routes } from "react-router-dom";
import Header from "../../components/Header/Header";
import Movies from "../../components/Movie/Moives";
import MovieInfo from "../../components/Movie/MovieInfo";
import './Movie.css';

export const IMG_BASE_URL = process.env.REACT_APP_MOVIE_IMG_BASE_URL;

function Movie() {

  return (
    <div className="movies-container">
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/:id" element={<MovieInfo />} />
      </Routes>
    </div>
  );
}

export default Movie;
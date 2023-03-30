import { Route, Routes } from "react-router-dom";
import Header from "../../components/Header/Header";
import Movies from "../../components/Movie/Moives";
import MovieDetail from "../../components/Movie/MovieDetail";
import './Movie.css';

export const IMG_BASE_URL = process.env.REACT_APP_MOVIE_IMG_BASE_URL;

function Movie() {
  return (
    <div>
      <Header />
      <div className="movie-container">
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default Movie;
import { Route, Routes } from "react-router-dom";
import Movies from "../../components/Movie/Moives";
import MovieInfo from "../../components/Movie/MovieInfo";
import './Movie.css';

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
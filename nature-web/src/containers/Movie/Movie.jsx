import { Route, Routes } from "react-router-dom";
import Header from "../../components/Header/Header";
import Movies from "../../components/Movie/Moives";
import MovieDetail from "../../components/Movie/MovieDetail";
import './Movie.css';

function Movie() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default Movie;
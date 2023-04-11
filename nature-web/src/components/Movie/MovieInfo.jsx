import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IMG_BASE_URL } from "../../containers/Movie/Movie";
import movieAction from '../../actions/movie/actions';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import './MovieInfo.css'
import Loading from "../../app/pages/Loading";

function MovieInfo() {
  const { id } = useParams();
  console.log('id ', id);
  // const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [movieId, setMovieId] = useState(null);
  const { movie } = useSelector(state => state.movieReducer)
  const backgroundImg = IMG_BASE_URL + movie.backdrop_path

  const handleBack = () => {
    navigate(-1);
  }
  useEffect(() => {
    setMovieId(movie.id);
    if (!movieId) {
      dispatch(movieAction.getMovie(id))
    }
  }, [movie])

  if (!movieId) {
    return <Loading />
  }
  return (
    <>
      <div className="movie-info goback">
        <span onClick={handleBack}>🔙</span>
      </div>
      <div className='movie-info-container'
        style={{ backgroundImage: `url(${backgroundImg})` }}>
        <div className="movie-info-bg">
          <section className="movie-info-column">
            <div className="poster-wrap">
              <img
                src={IMG_BASE_URL + movie.poster_path}
                alt={movie.title}
              />
            </div>
            <div className="description-wrap">
              <section className="header poster">
                <h2 className="title header">
                  <span className="title">{movie.title}</span>
                  <span className="release_date">({movie.release_date ? movie.release_date?.substr(0, 4) : '미정'})</span>
                </h2>
                <div className="facts">
                  <span className="certification">
                    {movie.adult ? 19 : '전체'}
                  </span>

                  <div className="release">
                    {movie.release_date}&nbsp;
                  </div>
                  <div className="genres">
                    {
                      movie?.genres?.map((gen) => (
                        <span key={gen.id}>{gen.name},&nbsp;</span>
                      ))
                    }
                  </div>
                  <div className="runtime">
                    {movie.runtime > 0 ? (Math.floor(movie.runtime / 60) + '시간' + movie.runtime % 60 + '분') : '개봉미정'}
                  </div>
                </div>
                <div className="header_info">
                  <h3 className="tagline">{movie.tagline}</h3>
                  <h3>개요</h3>
                  <div className="overview">
                    <p>{movie.overview || '-'}</p>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default MovieInfo;
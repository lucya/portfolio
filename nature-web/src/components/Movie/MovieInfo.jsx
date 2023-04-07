import { useLocation, useParams } from "react-router-dom";
import { IMG_BASE_URL } from "../../containers/Movie/Movie";
import movieAction from '../../actions/movie/actions';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './MovieInfo.css'

function MovieInfo() {
  const { id } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { movie } = useSelector(state => state.movieReducer)
  console.log('MovieItem', id, movie);

  const getMovieInfo = () => {
    dispatch(movieAction.getMovie(id))
  }

  const backgroundImg = IMG_BASE_URL + movie.backdrop_path
  useEffect(() => {
    window.scrollTo({
      top: 0,
      // behavior: 'smooth'
    })
    getMovieInfo();
  }, [])

  return (
    <div className='movie-info-header large' style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="movie-info-bg">
        <section className="movie-info-column">
          <div className="poster-wrap">
            <img
              src={IMG_BASE_URL + state.poster_path}
              alt={state.title}
            />
          </div>
          <div className="description-wrap">
            <section className="header poster">
              <h2 className="title header">
                <span className="title">{movie.title}</span>
                <span className="release_date">({movie?.release_date?.substr(0, 4)})</span>
              </h2>
              <div class="facts">
                <span class="certification">
                  {movie.adult ? 19 : '전체관람'}
                </span>

                <span class="release">
                  {movie.release_date} (KR)&nbsp;
                </span>
                <span class="genres">
                  {
                    movie?.genres?.map((gen) => (
                      <span>{gen.name},&nbsp;</span>
                    ))
                  }
                </span>
                <span class="runtime">
                  {Math.floor(movie.runtime / 60)}시간 {movie.runtime % 60}분
                </span>
              </div>
              <div class="header_info">
                <h3 class="tagline">{movie.tagline}</h3>
                <h3>개요</h3>
                <div class="overview">
                  <p>{movie.overview || '-'}</p>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MovieInfo;
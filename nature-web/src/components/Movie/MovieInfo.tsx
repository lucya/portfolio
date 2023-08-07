import { useNavigate, useParams } from "react-router-dom";
import { IMG_BASE_URL } from "../../app/config";
import movieAction from '../../actions/movie/actions';
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { useEffect, useState } from "react";
import './MovieInfo.css'
import Loading from "../../app/pages/Loading";
import MovieReview from "./MovieReview";
import MovieVideo from "./MovieVideo";
import ScrollToTop from "../../app/utils/ScrollToTop";

const MovieInfo: React.FC = () => {
  const { id } = useParams();
  const [popupShow, setPopupShow] = useState<boolean>(true)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [movieId, setMovieId] = useState<number>(0);
  const { movie } = useAppSelector(state => state.movieReducer)
  const backgroundImg = IMG_BASE_URL + movie?.backdrop_path

  const handleBack = () => {
    navigate(-1);
  }

  useEffect(() => {
    setTimeout(() => {
      setPopupShow(!popupShow)
    }, 2000)
  }, [])

  useEffect(() => {
    setMovieId(movie ? movie.id : 0); // 조회된 정보로 셋팅
    if (!movieId) {
      dispatch(movieAction.getMovie(Number(id)))
    }

  }, [])

  if (!movie) {
    return (
      <>
        <div className="movie-info goback">
          <span onClick={handleBack}>🔙</span>
        </div>
        <Loading />
      </>
    )
  }
  return (
    <>
      <ScrollToTop />
      <div className="movie-info goback">
        <span onClick={handleBack}>🔙</span>
      </div>
      <div className="movie-info-popup" style={{ display: popupShow ? 'block' : 'none' }}>
        <p>잠깐!<span className="blink">✋🏻</span></p>
        <br />
        <p>AI가 알려주는 영화 리뷰를 꼭 확인하세요!</p>
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
                      movie.genres.map((gen: any) => (
                        <span key={gen.id}>{gen.name},&nbsp;</span>
                      ))
                    }
                  </div>
                  <div className="runtime">
                    {movie.runtime > 0 ? (Math.floor(movie.runtime / 60) + '시간' + movie.runtime % 60 + '분') : '개봉미정'}
                  </div>
                </div>
                <div className="header-info">
                  <h3 className="tagline">{movie.tagline}</h3>
                  <h3>개요</h3>
                  <div className="overview">
                    <p>{movie.overview || '-'}</p>
                  </div>
                </div>
              </section>
              <section>
                <div className="ai-review">
                  <h3>AI가 알려주는 영화 리뷰</h3>
                  <MovieReview title={movie.title} />
                </div>
              </section>
              <section className="video">
                <MovieVideo id={movie.id} />
              </section>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default MovieInfo;
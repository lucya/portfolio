import { useEffect, useState } from "react";
import movieAction from "../../actions/movie/actions";
import LoadingBar from "../../app/pages/LoadingBar";

function MovieReview({ title }) {
  const [review, setReview] = useState(null)

  useEffect(() => {
    console.log("Movie getMovieReview")
    const getReview = () => {
      movieAction.getMovieReview({ title })
        .then((res) => {
          let answer = res.assistant;
          setReview(answer);
        })
    }

    getReview();
  }, [])

  if (!review) {
    return <LoadingBar />
  }
  return (
    <div className="movie-review">
      <p>{review}</p>
    </div>
  )
}
export default MovieReview;
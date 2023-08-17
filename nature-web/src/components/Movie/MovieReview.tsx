import { useEffect, useState } from "react";
import movieAction from "../../actions/movie/actions";
import LoadingBar from "../../app/pages/LoadingBar";

interface OwnProps {
  title: string;
}

function MovieReview({ title }: OwnProps) {
  const [review, setReview] = useState('')

  useEffect(() => {
    console.log("Movie getMovieReview")
    // const getReview = () => {
    movieAction.getMovieReview(title)
      .then((data) => {
        console.log("MovieReview", data);
        let answer = data.assistant;
        setReview(answer);
      })
    // }

    // getReview();
  }, [title])

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
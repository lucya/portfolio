import { useEffect } from "react";
import movieAction from '../../actions/movie/actions';
import { useAppSelector, useAppDispatch } from '../../app/hooks'

import YouTube, { YouTubeProps } from 'react-youtube';
import { MovieVideoType } from '../../actions/movie/types'
import type { RootState } from "../../app/store";

interface OwnProps {
  id: number;
}

function MovieVideo({ id }: OwnProps) {
  const dispatch = useAppDispatch();
  const { videos } = useAppSelector((state: RootState) => state.movieReducer)

  useEffect(() => {
    if (id !== 0)
      dispatch(movieAction.getMovieVideos(id))
  }, [id])

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  }
  const opts: YouTubeProps['opts'] = {
    playerVars: {
      autoplay: 0,
    },
  };

  let itemList = videos?.map((video: MovieVideoType, idx: number) => {
    return <YouTube videoId={video.key} opts={opts} onReady={onPlayerReady} />
  })

  if (videos?.length) {
    return (
      <>
        <h3>예고편</h3>
        {itemList}
      </>
    )
  } else {
    return (<></>)
  }

}

export default MovieVideo;
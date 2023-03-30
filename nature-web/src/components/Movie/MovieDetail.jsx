import { useLocation, useParams } from "react-router-dom";
import { IMG_BASE_URL } from "../../containers/Movie/Movie";

function MovieDetail() {
  const { title } = useParams();
  const { state } = useLocation();

  return (
    <div classsName='page-container'>
      <div
        style={{
          display: 'flex',
          padding: '30px 120px',
        }}
      >
        <img
          style={{ width: '300px', height: '450px' }}
          src={IMG_BASE_URL + state.poster_path}
          alt={title}
        />
        <div style={{ padding: '0 26px', fontSize: '32px' }}>
          <div>{title}</div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
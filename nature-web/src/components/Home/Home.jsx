import { HashLink } from 'react-router-hash-link';

import './Home.css';
import Resume from './Resume';
function Home() {
  return (
    <div className="home-container">
      <div className="breadcrumb">
        <div className='portfolio-link'>
          <span>포트폴리오 </span>
          <HashLink to="#frontend">Front-end</HashLink>
          <span>➕</span>
          <HashLink to="#backend">Back-end</HashLink>
        </div>
        <HashLink to="#resume">About Nature!</HashLink>
      </div>
      <div className="fe-wrap" id="frontend">
        <h2 >Front-end</h2>
        <div>
          <img src="https://firebasestorage.googleapis.com/v0/b/nature-portfolio-7b1db.appspot.com/o/nature_web.png?alt=media" alt='web' />
        </div>
      </div>
      <div className="be-wrap" id="backend">
        <h2 >Back-end</h2>
        <div>
          <img src="https://firebasestorage.googleapis.com/v0/b/nature-portfolio-7b1db.appspot.com/o/nature_server.png?alt=media" alt='web' />
        </div>
      </div>
      <div className="resume-wrap" id="resume">
        <h2>About Nature</h2>
        <div>
          <Resume />
        </div>
      </div>
    </div>
  )
}
export default Home
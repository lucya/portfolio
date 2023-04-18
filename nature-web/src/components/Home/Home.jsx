import { HashLink, NavHashLink } from 'react-router-hash-link';

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
      <div className="fe-wrap">
        <h2 id="frontend">Front-end 영역</h2>
      </div>
      <div className="be-wrap">
        <h2 id="backend">Back-end 영역</h2>
      </div>
      <div className="resume-wrap">
        <h2 id="resume">About Nature</h2>
        <div>
          <Resume />
        </div>
      </div>
    </div>
  )
}
export default Home
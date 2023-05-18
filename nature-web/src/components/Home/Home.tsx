import './Home.css';
import Resume from './Resume';
import { MutableRefObject, useRef, useState } from 'react';
import ScrollToTop from '../../app/utils/ScrollToTop';
import * as config from '../../app/config'


function Home() {
  const brcRef = useRef<HTMLDivElement>(null)
  const feRef = useRef<HTMLDivElement>(null)
  const beRef = useRef<HTMLDivElement>(null)
  const resumeRef = useRef<HTMLDivElement>(null)
  const [top, setTop] = useState(0)

  const frontEnd = config.GET_FIREBASE_FILE_URL('nature_web.png');
  const backEnd = config.GET_FIREBASE_FILE_URL('nature_server.png');

  const handleHashMove = (e: React.MouseEvent<HTMLButtonElement>, ref: React.Ref<HTMLDivElement>) => {
    e.preventDefault();
    let breadcrumbHeight = brcRef.current?.clientHeight || 0
    let h = (ref as MutableRefObject<HTMLDivElement>).current?.offsetTop - (breadcrumbHeight);
    setTop(h)
  }

  return (
    <>
      <ScrollToTop top={top} />
      <div className="home-container">
        <div className="breadcrumb" ref={brcRef}>
          <div className='portfolio-link'>
            <span>포트폴리오 </span>
            <button onClick={(e) => handleHashMove(e, feRef)} >Front-end</button>
            <span>➕</span>
            <button onClick={(e) => handleHashMove(e, beRef)} >Back-end</button>
          </div>
          <button onClick={(e) => handleHashMove(e, resumeRef)} >About Nature!</button>
        </div>
        <div className="fe-wrap" ref={feRef}>
          <h2 >Front-end</h2>
          <div>
            <img src={frontEnd} alt='web' />
          </div>
        </div>
        <div className="be-wrap" ref={beRef}>
          <h2 >Back-end</h2>
          <div>
            <img src={backEnd} alt='server' />
          </div>
        </div>
        <div className="resume-wrap" ref={resumeRef}>
          <h2>About Nature</h2>
          <div>
            <Resume />
          </div>
        </div>
      </div>
    </>
  )
}
export default Home
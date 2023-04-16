import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import * as config from '../config'

function ScrollToTop({ stay }) {
  const [top, setTop] = useState(0)
  const { pathname } = useLocation();

  useEffect(() => {
    if (stay) { //top 위치 유지가 필요한 페이지인 경우 true pass
      setTop(localStorage.getItem(config.SET_SCROLLY))
    }
    console.log('top', top)
    setTimeout(() => {
      document.querySelector('.main-container').scrollTo(0, top)
      stay && localStorage.removeItem(config.SET_SCROLLY);
    }, 300);
  }, [pathname, top])
  return null;
}
export default ScrollToTop
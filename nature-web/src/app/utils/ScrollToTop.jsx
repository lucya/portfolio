import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import * as config from '../config'

function ScrollToTop({ stay, top }) {
  const [scrollTop, setScrollTop] = useState(0)
  const { pathname } = useLocation();

  const handelScrollTo = () => {
    setTimeout(() => {
      document.querySelector('.main-container').scrollTo(0, scrollTop)
      stay && localStorage.removeItem(config.SET_SCROLLY);
    }, 300);
  }

  useEffect(() => {
    if (stay !== undefined) { //top 위치 유지가 필요한 페이지인 경우
      setScrollTop(localStorage.getItem(config.SET_SCROLLY))
    }
    handelScrollTo()

  }, [pathname, scrollTop])

  useEffect(() => {

    if (top >= 0) {
      setScrollTop(top)
    }
    handelScrollTo()

  }, [pathname, top])
  return null;
}
export default ScrollToTop
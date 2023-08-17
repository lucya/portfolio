import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import * as config from '../config'

interface IElementProps {
  stay?: boolean;
  top?: number | undefined;
}

function ScrollToTop({ stay, top }: IElementProps) {
  const [scrollTop, setScrollTop] = useState<number>(0)
  const { pathname } = useLocation();

  const handelScrollTo = () => {
    setTimeout(() => {
      const elm = document.querySelector('.main-container') as HTMLElement
      elm?.scrollTo(0, scrollTop)
      stay && sessionStorage.removeItem(config.SET_SCROLLY);
    }, 300);
  }

  useEffect(() => {
    if (stay !== undefined) { //top 위치 유지가 필요한 페이지인 경우
      let val = sessionStorage.getItem(config.SET_SCROLLY);
      // if (typeof val === 'number') {
      setScrollTop(Number(val))
      // }
    }
    handelScrollTo()

  }, [pathname, scrollTop])

  useEffect(() => {

    if (typeof top === 'number' && top >= 0) {
      setScrollTop(top)
    }
    handelScrollTo()

  }, [pathname, top])
  return null;
}
export default ScrollToTop